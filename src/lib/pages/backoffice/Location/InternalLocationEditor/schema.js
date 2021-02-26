export const schema = {
  type: 'object',
  required: ['location_pid', 'name'],
  properties: {
    location_pid: {
      type: 'string',
      title: 'Location',
    },
    name: {
      type: 'string',
      title: 'Name',
    },
    notes: {
      type: 'string',
      title: 'Notes',
    },
    physical_location: {
      type: 'string',
      title: 'Physical location',
    },
  },
};
