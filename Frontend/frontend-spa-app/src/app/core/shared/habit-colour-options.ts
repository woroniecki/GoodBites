import { HabitColourEnum } from '../../api-client/models';

const habitColourOptions = (
  [
    'Green',
    'Lime',
    'Red',
    'Maroon',
    'Blue',
    'Navy',
    'Cyan',
    'Teal',
    'Pink',
    'Purple',
    'Orange',
    'Brown',
    'Yellow',
    'Olive',
    'Grey',
    'Black',
  ] as HabitColourEnum[]
).map((color) => ({ label: color, value: color }));

export const habitColourOptionForm = {
  label: 'Colour',
  name: 'colour',
  type: 'select',
  required: true,
  defaultValue: 'Green', // optional
  options: habitColourOptions,
};
