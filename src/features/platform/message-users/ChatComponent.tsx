import type { Doc } from "convex/_generated/dataModel";
import { ChatHeader } from "./chatparts/ChatHeader";
import { Sender } from "./chatparts/Sender";
import { MessageList } from "./chatparts/MessageList";
 
  
export function ChatComponent({myProfile,chatPartner}:{myProfile:Doc<"profiles">,chatPartner:Doc<"profiles">}) {
  
    if (chatPartner === undefined || myProfile === undefined) {
      return <div>Loading...</div>;
    }
  
    if (chatPartner === null) {
      return <div>User not found</div>;
    }
  
    return (
      <div className="flex flex-1 flex-col" style={{ height: "calc(100vh - 5rem)" }}>
        <ChatHeader chatPartner={chatPartner} />
        <MessageList chatPartner={chatPartner} myProfile={myProfile}/>
        <Sender chatPartner={chatPartner} />
      </div>
    );
  } 