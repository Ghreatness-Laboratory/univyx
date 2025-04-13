export default function PartnerCard({ image }: { image: string }) {
  return (
    <div className="grid place-items-center h-32 w-full rounded-xl border border-gray-300">
      <div className="flex items-center justify-center w-full px-4">
        <img
          src={image}
          alt="partner"
          className="w-auto h-10 max-h-10 object-contain"
        />
      </div>
    </div>
  );
}
