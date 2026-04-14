import { BsBookmarkPlusFill } from "react-icons/bs";
import { RiBookmark2Fill } from "react-icons/ri";
import {
  useCreateAnimeMutation,
  useDeleteAnimeMutation,
  useGetCurrentUserQuery,
  useGetSingleAnimeQuery,
} from "../../api/backendApi";
import { useSafeQuery } from "../../hooks/useSafeQuery";
import { createWatchlistItemSchema } from "../../schemas/backendSchema";
import type { MyBackendError } from "../../types/types";
import { toaster } from "../../utils/toaster";
import Spinner from "../spinner/Spinner";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function WatchlistButton({
  id,
  title,
  image,
  trailer,
}: {
  id: string;
  title: string;
  image: string;
  trailer: boolean;
}) {
  const { data: user } = useGetCurrentUserQuery();
  const [createAnime, { isLoading }] = useCreateAnimeMutation();
  const [deleteAnime, { isLoading: isDeleting }] = useDeleteAnimeMutation();
  const query = useGetSingleAnimeQuery(String(id));

  const navigate = useNavigate();

  const { data } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: createWatchlistItemSchema,
  });

  const handleAdd = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
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
    if (!user) {
      navigate("/login");
      return;
    }
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
          className={`main-btn-sm main-text-size border-main-btn text-main-btn hover:bg-main-btn-hover group gap-2 border-2 bg-transparent hover:text-white`}
        >
          <span>
            {isLoading ? (
              <Spinner />
            ) : (
              <span className="content-center-x text-main-btn gap-2 group-hover:text-white">
                <BsBookmarkPlusFill />
                {!trailer && <span>Add to Watchlist</span>}
              </span>
            )}
          </span>
        </Button>
      )}

      {data && (
        <Button
          onClick={handleRemove}
          className={`main-btn-sm main-text-size border-main-btn hover:bg-main-btn-hover bg-main-btn gap-2 border-2 text-white hover:border-white`}
        >
          <span>
            {isDeleting ? (
              <Spinner />
            ) : (
              <span className="content-center-x gap-2 group-hover:text-white">
                <RiBookmark2Fill />
                {!trailer && <span>Remove from Watchlist</span>}
              </span>
            )}
          </span>
        </Button>
      )}
    </>
  );
}

export default WatchlistButton;
