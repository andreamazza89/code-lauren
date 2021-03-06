## Reusing a name

### Repeated additions

Delete the code on the left. Type in this code:

```
first-number: 1
write(first-number 600 200 "black")

second-number: add(first-number 2)
write(second-number 600 230 "black")
```

You created `second-number` by giving `first-number` and `2` to the `add` action.  That is, you created a number from an existing name and gave that number a new name.

### Reusing a name

But why bother making a new name? Why not just reuse the old one? Change the code on the left to this:

```
number: 1
write(number 600 200 "black")

number: add(number 2)
write(number 600 230 "black")
```

Do you see how `number` was reused as the name of the result of adding `number` and `2`? Why is that useful? Let's find out...
