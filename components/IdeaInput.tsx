type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function IdeaInput({
  value,
  onChange,
}: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Example:

I want to build a hospital management system.

Doctors manage patients.

Patients book appointments.

Bills belong to patients."
      className="w-full max-w-5xl h-72 rounded-xl border border-zinc-700 bg-zinc-900 p-5 text-white outline-none resize-none"
    />
  );
}