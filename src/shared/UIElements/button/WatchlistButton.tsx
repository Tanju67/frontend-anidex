import { BsBookmarkPlusFill } from "react-icons/bs";
import {
  useCreateAnimeMutation,
  useDeleteAnimeMutation,
  useGetSingleAnimeQuery,
} from "../../api/backendApi";
import { useSafeQuery } from "../../hooks/useSafeQuery";
import { createWatchlistItemSchema } from "../../schemas/backendSchema";
import type { MyBackendError } from "../../types/types";
import { toaster } from "../../utils/toaster";
import Spinner from "../spinner/Spinner";
import Button from "./Button";
import { RiBookmark2Fill } from "react-icons/ri";

function WatchlistButton({
  id,
  title,
  image,
}: {
  id: string;
  title: string;
  image: string;
}) {
  const [createAnime, { isLoading }] = useCreateAnimeMutation();
  const [deleteAnime, { isLoading: isDeleting }] = useDeleteAnimeMutation();
  const query = useGetSingleAnimeQuery(String(id));

  const { data } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: createWatchlistItemSchema,
  });

  const handleAdd = async () => {
    try {
      await createAnime({
        title: title || "",
        image,
        animeId: String(id),
      }).unwrap();
      toaster("success", "Added to watchlist");
    } catch (error) {
      const err = error as MyBackendError;
      const message = err.data?.message || "Something went wrong";
      toaster("error", message);
    }
  };

  const handleRemove = async () => {
    try {
      await deleteAnime(String(id)).unwrap();
      toaster("success", "Removed from watchlist");
    } catch (error) {
      const err = error as MyBackendError;
      const message = err.data?.message || "Something went wrong";
      toaster("error", message);
    }
  };

  return (
    <>
      {!data && (
        <Button
          onClick={handleAdd}
          className={`main-btn-sm main-text-size border-main-btn text-main-btn hover:bg-main-btn-hover gap-2 border-2 bg-transparent hover:text-white`}
        >
          <span>{isLoading ? <Spinner /> : <BsBookmarkPlusFill />}</span>
        </Button>
      )}

      {data && (
        <Button
          onClick={handleRemove}
          className={`main-btn-sm main-text-size border-main-btn hover:bg-main-btn-hover bg-main-btn gap-2 border-2 text-white hover:border-white`}
        >
          <span>{isLoading ? <Spinner /> : <RiBookmark2Fill />}</span>
        </Button>
      )}
    </>
  );
}

export default WatchlistButton;
