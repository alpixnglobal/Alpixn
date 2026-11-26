import Image from "next/image"
import NavbarItems from "./NavbarItems";
import { Button } from '@/components/ui/buttonBtn'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-full]">
      <Image src="/images/logo.png" alt="Logo" width={214} height={82} />
      <NavbarItems />
      <Button>Contact Us</Button>
    </nav>
  );
}

export default Navbar