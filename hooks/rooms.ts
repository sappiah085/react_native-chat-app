import { getRooms, room, store } from "@/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

export const useRoomHook = (id: string) => {
  const id_memo = useMemo(() => id, [id]);
  const [rooms, setRooms] = useState<room[]>([]);
  const [make_a_Call, setMake_a_Call] = useState<number>(0);
  useEffect(() => {
    if (id_memo) {
      let q = query(
        collection(store, "rooms"),
        where("members", "array-contains", id_memo)
      );
      onSnapshot(q, (snap) => {
        setMake_a_Call((pre) => pre + 1);
      });
    }
  }, [id_memo]);
  useEffect(() => {
    const func = async () => {
      if (id_memo) {
        const rooms = await getRooms(id_memo);
        setRooms(rooms);
      }
    };
    func();
  }, [make_a_Call]);
  return rooms;
};
