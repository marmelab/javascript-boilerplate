import expect from 'expect';
import userRepository from './userRepository';

describe('User repository', () => {
    let client;

    beforeEach(() => {
        client = () => { };
        client.link = () => ({});
    });

    it('should show basic infos', () => {
        expect(userRepository.queries.selectOne.table()).toEqual('user_account');
        expect(userRepository.queries.selectOne.returnFields()).toEqual([
            'id',
            'email',
            'password',
        ]);
    });

    it('should correctly retrieve user by email', async () => {
        client = {
            link: () => ({
                findByEmail: (email) => {
                    expect(email).toEqual('email@example.org');

                    return Promise.resolve([{ id: 42, email: 'email@example.org' }]);
                },
            }),
        };

        const res = await userRepository(client).findByEmail('email@example.org');
        expect(res).toEqual({ id: 42, email: 'email@example.org' });
    });
});
