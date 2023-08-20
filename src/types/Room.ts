export type room = {
  roomId: string;
  user: {
    username: string;
    _id: string;
  };
  history: [
    {
      message: string;
      sender: string;
      date: Date;
    }
  ];
};
