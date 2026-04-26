import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetAnimeReviewsByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  ReviewsSchema,
  type ReviewsType,
} from "../../shared/schemas/animeSchema";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import ReviewContent from "../animeDetail/ReviewContent";
import SectionTitle from "../animeDetail/SectionTitle";
import ReviewContentSkeleton from "../../shared/UIElements/skeleton/ReviewContentSkeleton";
import IsLoadingMore from "../../shared/UIElements/isLoadingMore/IsLoadingMore";

function Reviews() {
  const { animeId } = useParams();
  const [page, setPage] = useState(1);
  const [allReviews, setAllReviews] = useState<ReviewsType>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [getReviews, { isLoading, isFetching, isError }] =
    useLazyGetAnimeReviewsByIdQuery();

  useEffect(() => {
    if (!animeId) return;

    getReviews({ id: animeId, page: 1 })
      .unwrap()
      .then((res) => {
        const parsed = ReviewsSchema.parse(res.data);

        setAllReviews(parsed);
        setHasNextPage(res.pagination.has_next_page);
      });
  }, [animeId, getReviews]);

  const loadMore = async () => {
    if (!animeId || isLoadingMore || !hasNextPage) return;
    setIsLoadingMore(true);

    const nextPage = page + 1;

    try {
      const res = await getReviews({ id: animeId, page: nextPage }).unwrap();
      const parsed = ReviewsSchema.parse(res.data);

      setAllReviews((prev) => [...prev, ...parsed]);
      setHasNextPage(res.pagination.has_next_page);
      setPage(nextPage);
    } catch (err) {
      console.error("Error loading more episodes:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const { ref } = useInView({
    onEnter: () => {
      if (
        hasNextPage &&
        !isFetching &&
        !isLoading &&
        !isLoadingMore &&
        !isError
      ) {
        loadMore();
      }
    },
    triggerOnce: false,
  });

  let content;

  if (isLoading && page === 1) {
    content = <ReviewContentSkeleton />;
  } else if (isError || !allReviews.length) {
    content = <div className="opacity-60">No data found</div>;
  } else {
    content = (
      <>
        <ReviewContent data={allReviews} />
        {hasNextPage && (
          <div
            ref={ref}
            className="flex h-32 flex-col items-center justify-center gap-2"
          >
            {isLoadingMore && !isError && <Spinner />}
            {isError && <IsLoadingMore loadMore={loadMore} />}
          </div>
        )}
      </>
    );
  }

  return (
    <div>
      <SectionTitle title="All Reviews" isBack={true}>
        {content}
      </SectionTitle>
    </div>
  );
}

export default Reviews;
