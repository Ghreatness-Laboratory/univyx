import { Mail } from "lucide-react";
import { Ambassador } from "../../../../types/universityProfile";

interface AmbassadorCardProps {
  ambassador: Ambassador;
}

export default function AmbassadorCard({ ambassador }: AmbassadorCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
      <div className="h-48 overflow-hidden">
        <img
          src={ambassador.image}
          alt={ambassador.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-primary">{ambassador.name}</h4>
        <p className="text-sm text-secondary">{ambassador.role}</p>
        <div className="flex items-center gap-2 text-sm mt-3">
          <Mail size={16} className="text-secondary" />
          <span>{ambassador.email}</span>
        </div>
      </div>
    </div>
  );
}
