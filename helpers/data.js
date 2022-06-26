const greetings = [
    'hey',
    'hi',
    'yo', 
    'sup',
    'hello',
    'ahoy!'
];

export const getGreetings = () => {
    return greetings;
}

export const addGreeting = (greeting) => {
    greetings.push(greeting)
}