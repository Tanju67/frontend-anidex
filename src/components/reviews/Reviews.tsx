import { useEffect, useState } from "react";
import {
  ReviewsSchema,
  type ReviewsType,
} from "../../shared/schemas/animeSchema";
import { useLazyGetAnimeReviewsByIdQuery } from "../../shared/api/animeApi";
import { useParams } from "react-router-dom";
import { useInView } from "../../shared/hooks/useInView";
import ReviewContent from "../animeDetail/ReviewContent";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import SectionTitle from "../animeDetail/SectionTitle";

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

  const loadMore = () => {
    if (!animeId) return;

    setPage((prevPage) => {
      const nextPage = prevPage + 1;

      getReviews({ id: animeId, page: nextPage })
        .unwrap()
        .then((res) => {
          const parsed = ReviewsSchema.parse(res.data);

          setAllReviews((prev) => [...prev, ...parsed]);
          setHasNextPage(res.pagination.has_next_page);
        });

      return nextPage;
    });
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
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
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
