import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/SIdebar";
import ConversationList from "./components/ConversationList";

const ConversationsLayout = async ({ children }: { children: React.ReactNode }) => {
    const conversations = await getConversations();
    const users = await getUsers();
    return (
        <Sidebar>
            <div className="h-screen">
                <ConversationList users={users} initialItems={conversations} />
                {children}
            </div>
        </Sidebar>
    );
}

export default ConversationsLayout;