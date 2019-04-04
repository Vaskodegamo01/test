const  fizzBuzz =(n)=>{
    if(n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
    if(n % 3 === 0) return 'Fizz';
    if(n % 5 === 0) return 'Buzz';
    else return n;
};

describe('fizzBuzz', ()=>{
    it('exists', ()=>{
        fizzBuzz();
    });

    it('return 1 for 1', ()=>{
        const result = fizzBuzz(1);
        expect(result).toBe(1);
    });

    it('return 2 for 2', ()=>{
        const result = fizzBuzz(2);
        expect(result).toBe(2);
    });

    it('return Fizz for 3', ()=>{
        const result = fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('return Buzz for 5', ()=>{
        const result = fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it('return Fizz for 6', ()=>{
        const result = fizzBuzz(6);
        expect(result).toBe('Fizz');
    });

    it('return Buzz for 10', ()=>{
        const result = fizzBuzz(10);
        expect(result).toBe('Buzz');
    });

    it('return FizzBuzz for 15', ()=>{
        const result = fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });
});