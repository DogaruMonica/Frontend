
export class Message {
  chatid: number;
  userId: number;
  dateTime: String;
  message: string;
  email :string

  constructor(chatid: number,userid : number,dateTime : String,message : string,email: string){
    this.chatid=chatid;
    this.userId=userid;
    this.dateTime=dateTime;
    this.message=message;
    this.email=email;
  }

}


