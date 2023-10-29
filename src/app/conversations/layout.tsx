import getConversations from "../actions/getConversations";
import Sidebar from "../components/sidebar/SIdebar";
import ConversationList from "./components/ConversationList";

const ConversationsLayout = async ({ children }: { children: React.ReactNode }) => {
    const conversations = await getConversations();
    return (
        <Sidebar>
            <div className="h-screen">
                <ConversationList initialItems={conversations} />
                {children}
            </div>
        </Sidebar>
    );
}

export default ConversationsLayout;