import { Button } from '@/components/ui/button'
import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
    return (
        <div>
            <h3>hello dashboard ( Protected ) </h3>
            <UserButton afterSignOutUrl='/' />
        </div>
    )
}

export default DashboardPage;