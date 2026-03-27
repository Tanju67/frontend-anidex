import Spinner from "./Spinner";

function PageSpinner({ className }: { className?: string }) {
  return (
    <div className={"flex items-center justify-center " + className}>
      <Spinner />
    </div>
  );
}

export default PageSpinner;
