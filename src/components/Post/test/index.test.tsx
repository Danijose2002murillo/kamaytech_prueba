
import { render, screen, fireEvent } from '@testing-library/react';
import Post from '../index';

//interfaces
import { Notification, PostPayload } from '../../../Interface/index';

describe('TEST', () => {
    test('pass', () => {
        render(<Post setNotification={function (msg: Notification): void {
            msg = {msg: "", color: ""}
        }} setIsOpen={function (isOpen: boolean): void {
            isOpen = false;
        } } isOpen={false} editObj={{"body": "", "title": "", "userId": 1, "id": "", "comment": ""}} setPostList={function (arr: string[]): void {
            arr = []
        } } postList={[]} setEditObj={function (post: PostPayload): void {
            post = {"body": "", "title": "", "userId": 1, "id": "", "comment": ""}
        }} />)
        
    });
});