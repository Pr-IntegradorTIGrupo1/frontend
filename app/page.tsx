import Image from "next/image";
import ProfileInfoCard from "@/components/ProfileInfoCard";
import Sidebar from "@/components/Sidebar";
import LeftDrawer from "@/components/Drawer";
import UserAccountInfoCard from "@/components/UserAccountInfoCard";
import { Divider } from '@chakra-ui/react'
import { DividerWithContent } from "@/components/DividerWithContent";
import LastTransactionCard from "@/components/LastTransactionCard";
export default function Home() {
  return (
    <div className="flex">
      {/*<Sidebar />*/}
      <LeftDrawer />
      <main  className="flex-1">
        <ProfileInfoCard userName="midudev" name="Miguel " />
        <UserAccountInfoCard totalBalance="1000" email="example@email.com" transaccionAmount="100" />
        <DividerWithContent content="Last Transaction" />
        <LastTransactionCard amount= "19990" transactionDate="31/05/2024" transasctionId="25896574125"/>
      </main>
    </div>
  );
}
