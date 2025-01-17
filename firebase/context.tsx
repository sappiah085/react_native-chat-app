import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth, getUser } from "./firebase";
import { useRoomHook } from "@/hooks/rooms";
export type user_type = {
  name: string;
  email: string;
  id: string;
};
const UserContext = createContext<any>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    try {
      onAuthStateChanged(auth, async (user: any) => {
        if (user) {
          const uid = user.uid;
          let user_from_doc = await getUser(uid);
          setLoading(false);
          setUser(user_from_doc as user_type);
        } else {
          setLoading(false);
          setUser(undefined);
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const rooms = useRoomHook(user?.id);
  const data_memo = useMemo(() => {
    return [user, setUser, loading, rooms];
  }, [user, loading, rooms]);
  return (
    <UserContext.Provider value={data_memo}>{children}</UserContext.Provider>
  );
};

export const UseUserContext = () => {
  const user = useContext(UserContext);
  return user;
};
