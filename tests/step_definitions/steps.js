const I = actor();

Given('я перехожу на страницу логина', ()=>{
    I.amOnPage('/login');
});

Given('я ввожу необходимые данные', ()=>{
    I.fillField('Enter username', 'user');
    I.fillField('Enter password', '123');
});

Given('нажимаю на кнопку логина', ()=>{
    I.retry({ retries: 3, minTimeout: 500 }).click('.btn-primary');
});

Given('я вижу информацию о успешном логине', ()=>{
    I.retry({ retries: 3, minTimeout: 500 }).see('Login successful','.title');
});

Given('я нажимаю на логаут', ()=>{
    I.wait(5);
    I.retry({ retries: 3, minTimeout: 1000 }).click('.dropdown-toggle');
    I.retry({ retries: 5, minTimeout: 1000 }).click('Logout', '.dropdown-menu');
});

Given('я вижу информацию о успешном логауте', ()=>{
    I.retry({ retries: 3, minTimeout: 500 }).see('Logout successful','.title');
});