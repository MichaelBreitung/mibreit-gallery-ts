# Validate inputs consistently and define defaults in one place

**Priority:** 3

## Background

Input handling differs between the web components and the factories they call. The images wall factory checks its container selector but not its image selector. The web components convert attribute strings to numbers without checking them, so an invalid value such as text becomes a non-number that is passed on to the configuration checks or, where there are none, used as is. Defaults are scattered: most attributes pass an undefined value and leave the default to the library, while the slideshow element sets its own interval default.

## Affected Areas

| Area                           | Role                                        | Impact                                                                                                        |
| ------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Web components                 | Read attributes and convert them to numbers | Validate conversions and fail with a descriptive error, as the factories do for invalid parameters.           |
| Factories                      | Validate selectors and configuration        | Check all parameters in the same way, including the images wall factory's image selector and numeric options. |
| Configuration types and checks | Define options and their checks             | One place defines each default. The slideshow interval default moves there.                                   |
| `README.md`                    | Lists attributes and defaults               | Stays correct. Update if a default changes.                                                                   |
| `doc/architecture.md`          | Describes validation and defaults           | Reconcile.                                                                                                    |

## Acceptance criteria

- [ ] An attribute with a non-numeric value where a number is expected produces a descriptive error and does not reach the library as an invalid number.
- [ ] All factory parameters, including the images wall's image selector and its numeric options, are checked, with descriptive errors.
- [ ] Each default is defined in one place, and the web components do not repeat library defaults.
- [ ] The documented defaults match the actual ones.
- [ ] Existing browser and unit tests pass, and invalid input cases are covered where a test setup exists.

## Notes

- Depends on the outcome of `narrow-public-api`: factories that become internal may need less checking, but the web components still need to validate their attributes. The two tickets can be solved in either order.
- Behaviour change: pages with currently invalid attribute values will start to fail loudly.
