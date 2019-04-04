import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactTestUtils from 'react-dom/test-utils';
import Button from './Button';


describe('return button', ()=>{

    it('render with text', ()=>{
        const text = 'text';
        const renderer = new ShallowRenderer();
        const btn = renderer.render(<Button text={text}/>);
        expect(btn.type).toBe('button');
        expect(btn.props.children).toBe(text);
    });

    it('fires onClick callback', () => {
        const onClick = jest.fn();

        const tree = ReactTestUtils.renderIntoDocument(<Button onClick={onClick}/>);

        const button = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'button');
        ReactTestUtils.Simulate.click(button);

        expect(onClick).toBeCalled();
    })
});