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

function Reviews() {
  const { animeId } = useParams();
  const [page, setPage] = useState(1);
  const [allReviews, setAllReviews] = useState<ReviewsType>([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [getReviews, { isLoading, isFetching }] =
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
    if (!animeId) return;

    const nextPage = page + 1;

    try {
      const res = await getReviews({ id: animeId, page: nextPage }).unwrap();
      const parsed = ReviewsSchema.parse(res.data);

      setAllReviews((prev) => [...prev, ...parsed]);
      setHasNextPage(res.pagination.has_next_page);
      setPage(nextPage);
    } catch (err) {
      console.error("Error loading more episodes:", err);
    }
  };

  const { ref } = useInView({
    onEnter: () => {
      if (hasNextPage && !isFetching && !isLoading) {
        loadMore();
      }
    },
    triggerOnce: false,
  });

  if (isLoading && page === 1) {
    return (
      <SectionTitle title="All Episodes" isBack={true}>
        <ReviewContentSkeleton />
      </SectionTitle>
    );
  }

  if (!allReviews.length) {
    return <div className="text-center opacity-60">No reviews found</div>;
  }

  return (
    <div>
      <SectionTitle title="All Reviews" isBack={true}>
        <ReviewContent data={allReviews} />
      </SectionTitle>

      {hasNextPage && (
        <div ref={ref} className="flex h-20 items-center justify-center">
          {isFetching && <Spinner />}
        </div>
      )}
    </div>
  );
}

export default Reviews;
