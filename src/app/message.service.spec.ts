import { MessageService } from "./message.service";

describe('Message Service',()=>{
    let Message:MessageService;
      
    it('message should be empty',()=>{
        Message = new MessageService();
        expect(Message.messages.length).toBe(0);
    })

    it('message should be add when add method is called',()=>{
        Message = new MessageService();
        Message.add('hello');
        expect(Message.messages.length).toBe(1);
    })

    it('message should  be add when add method is called',()=>{
        Message = new MessageService();
        Message.add('hello');
        expect(Message.messages).toMatch('hello');
    })

    it('message should be add when add method is called and check to contain method ',()=>{
        Message = new MessageService();
        Message.add('hello1');
        expect(Message.messages).toContain('hello1');
    })


    it('message shuld be delete when delete method is called',()=>{
        Message = new MessageService();
        Message.clear();
        expect(Message.messages.length).toBe(0);
    })
})