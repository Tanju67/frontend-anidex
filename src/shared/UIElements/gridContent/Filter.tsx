function Filter({
  checkedValue,
  label,
  onChange,
}: {
  checkedValue: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label className="label cursor-pointer gap-2">
      <input
        type="radio"
        name="anime-type"
        className="radio text-main-btn border-main-btn border-2"
        checked={checkedValue}
        onChange={onChange}
      />
      <span className="label-text">{label}</span>
    </label>
  );
}

export default Filter;
