
import 'jsdom-global/register';
import React from 'react';
import Todo from '../App';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { getByText } from '@testing-library/react';
import { getAllByRole } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";

describe("Todo", () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<Todo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the input, todo, and done list", () => {
    const { getByText } = render(<Todo />);
    expect(getByText("TODO")).toBeInTheDocument();
    expect(getByText("DONE")).toBeInTheDocument();
    expect(getByText("Enter")).toBeInTheDocument();
  });
  

it("doesn't have any element in To Do in starting", () => {
  const { getByRole } =  render (<Todo />);

  expect(getByRole("textbox").getAttribute('value')).toBeNull;
});

  it("adds todo item on Enter button click", () => {
     
    render(<Todo />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "new todo item")
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(screen.getByText("new todo item")).toBeInTheDocument();
  });

  it("moves todo item to done list on checkbox change", () => {
    render(<Todo />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "new todo item");
    const button = screen.getByRole("button");
    userEvent.click(button);
    const checkbox = screen.getAllByRole("checkbox")[0];
    userEvent.click(checkbox);
    expect(screen.queryByText("new todo item")).toBeNull();
    expect(screen.getByText("new todo item", { exact: false })).toBeInTheDocument();
  });
  
});



/*
import React from 'react';
import Todo from '../App';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import 'jsdom-global/register';


describe("Todo", () => {
  it("renders without crashing", () => {
    const { container } = render(<Todo />);
    expect(container).toBeTruthy();
  });

  it("adds an item to todo list", () => {
    const { getByText, getByTestId } = render(<Todo />);
    const input = getByTestId("input");
    const button = getByText("Enter");

    const inputText = screen.getByRole("textbox");
    expect(inputText).toBeInTheDocument();
    inputText.setAttribute(value , "ok");
    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(button);

    expect(getByText("Test Todo")).toBeTruthy();
  });

  it("moves an item from todo to done", () => {
    const { getByText, getByTestId } = render(<Todo />);
    const input = getByTestId("input");
    const button = getByText("Enter");

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(button);

    const checkbox = getByTestId("checkbox");
    fireEvent.click(checkbox);

    expect(getByText("Test Todo")).toBeFalsy();
    expect(getByText("Test Todo", { exact: false })).toBeTruthy();
  });
});





import React from 'react';
import Todo from '../App';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import 'jsdom-global/register';

describe('Todo component', () => {
  it('renders an input and a button', () => {
    const { getByTestId } = render(<Todo />);

    expect(getByTestId('input')).toBeInTheDocument();
    expect(getByTestId('button')).toBeInTheDocument();
  });

  it('input accepts value', () => {
    const { getByTestId } = render(<Todo />);

    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'Task 1' } });
    expect(input.value).toBe('Task 1');
  });

  it('enters a task', () => {
    const { getByTestId } = render(<Todo />);

    const input = getByTestId('input');
    const button = getByTestId('button');
    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(button);
    expect(getByTestId('todo-list')).toHaveTextContent('Task 1');
  });

  it('moves a task to done list', () => {
    const { getByTestId } = render(<Todo />);

    const input = getByTestId('input');
    const button = getByTestId('button');
    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(button);
    const checkbox = getByTestId('checkbox-0');
    fireEvent.click(checkbox);
    expect(getByTestId('done-list')).toHaveTextContent('Task 1');
  });
});



import React from 'react';
import Todo from '../App';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import 'jsdom-global/register';


describe('Todo', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Todo />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('adds a todo item', () => {
    const { getByText, getByTestId } = render(<Todo />);
    const input = screen.getByTestId('todo-input');
    fireEvent.change(input, { target: { value: 'learn react' } });
    fireEvent.click(getByText('Enter'));
    expect(getByText('learn react')).toBeInTheDocument();
  });

  it('moves a todo item to done', () => {
    const { getByText, getByTestId } = render(<Todo />);
    const input = getByTestId('todo-input');
    fireEvent.change(input, { target: { value: 'learn react' } });
    fireEvent.click(getByText('Enter'));
    const checkbox = getByTestId(`checkbox-${0}`);
    fireEvent.click(checkbox);
    expect(getByText('learn react')).not.toBeInTheDocument();
    expect(getByText('learn react')).toBeInTheDocument();
  });

  /*
  it('adds todo items', () => {
    const { getByPlaceholderText, getByText } = render(<Todo />);
    const input = getByPlaceholderText(/Enter todo item/i);
    const button = getByText(/Enter/i);

    fireEvent.change(input, { target: { value: 'Test todo item' } });
    fireEvent.click(button);

    expect(input).toHaveValue('');
    expect(getByText('Test todo item')).toBeInTheDocument();
  });

  it('moves todo items to done', () => {
    const { getByPlaceholderText, getByText } = render(<Todo />);
    const input = getByPlaceholderText(/Enter todo item/i);
    const button = getByText(/Enter/i);
    const checkbox = getByText(/Test todo item/i).previousSibling;

    fireEvent.change(input, { target: { value: 'Test todo item' } });
    fireEvent.click(button);

    fireEvent.click(checkbox);

    expect(getByText('Test todo item')).not.toBeInTheDocument();
    expect(getByText('Test todo item')).toBeInTheDocument();
  }); 
  
});

 import React from 'react';
import Todo from '../App';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jsdom-global/register';


describe('Todo component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Todo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays todo items and add todo', () => {
    const { getByLabelText, getByText, getByTestId } = render(<Todo />);
    const input = getByLabelText('Input');
    fireEvent.change(input, { target: { value: 'todo item' } });
    fireEvent.click(getByText('Enter'));
    const todoItem = getByTestId('todo-item');
    expect(todoItem).toHaveTextContent('todo item');
  });

  it('adds done item', () => {
    const { getByLabelText, getByText, getByTestId } = render(<Todo />);
    const input = getByLabelText('Input')
    fireEvent.change(input, { target: { value: 'todo item' } });
    fireEvent.click(getByText('Enter'));
    const checkbox = getByTestId('checkbox');
    fireEvent.click(checkbox);
    const doneItem = getByTestId('done-item');
    expect(doneItem).toHaveTextContent('todo item');
  });
});
*/