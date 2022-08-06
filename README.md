This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Check the live version [here](https://taskmanagment.netlify.app/)

## Inspiration:

This app was a Level 5 challenge on the frontendmentor website. I did a Level 1 challenge, a Level 3 challenge, then jumped straight to a level 5 one since I wanted to learn faster. Check that out [here](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB)


## Thoughts:

Contrary to what I had initially expected, the CSS wasn't the hard part of the project. State management in React turned to be a bit tricky to grasp, since the project was quite a step up from the previous state management I had done in React.
I initially did get it to work using a "duct and tape" solution of sorts, but I was unhappy with the architecture. After some thought, inspiration finally came and I tore down the old architecture and build a new one, with all the task management functionality wrapped in a neat function of its own. This greatly reduced the lines of code I had to write, made debugging easier, and was generally better to look at. 

All in all, this project took me 24 hours to complete.

It also features drag and drop with synchronized state updation. 

I tried using the (react version of SortableJS)[https://www.npmjs.com/package/react-sortablejs] but it did not offer the functionality to move items between columns. Then I stumbled upon the (react-beautiful-dnd)[https://www.npmjs.com/package/react-beautiful-dnd] package, which gave me exactly what I was looking for.
