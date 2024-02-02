import { BoltIcon } from "@heroicons/react/24/outline";

export default function DefaultCard() {
  return (
    <div className="flex flex-col p-2 border border-blue-500 rounded-lg gap-3">
      <div className="flex flex-row gap-3 items-center">
        <div className="p-1 bg-gray-100 rounded-lg">
          <BoltIcon className="w-6 h-6 text-blue-500" />
        </div>
        <span>Minecraft</span>
      </div>

      <p className="text-justify line-clamp-5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit blanditiis
        ipsam aut. Similique cupiditate doloremque eligendi mollitia veritatis
        officia ipsum quisquam, illo labore! Praesentium quasi sunt sed,
        voluptate fugit corrupti!
      </p>

      <div className="flex flex-row justify-between">
        <span className="text-sm text-black">Flexrock</span>
        <a role="button" className="hover:underline text-blue-500 text-sm">
          Detaya Git
        </a>
      </div>
    </div>
  );
}
