type Props = {
  loading: boolean;
  onClick: () => void;
};

export default function GenerateButton({
  loading,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="mt-6 rounded-lg bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-500 disabled:opacity-60"
    >
      {loading ? "Generating..." : "Generate UML"}
    </button>
  );
}