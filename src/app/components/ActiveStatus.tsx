'use client';

import useActiveChannel from "../hooks/useActiveChannel";
import usePusherClient from "../hooks/usePusherClient";

const ActiveStatus = () => {
    const { pusherClient } = usePusherClient();
    useActiveChannel(pusherClient);

    return null;
};

export default ActiveStatus;