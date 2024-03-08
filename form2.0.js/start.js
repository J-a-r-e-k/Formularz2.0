const state = {
  userInfo: {
    name: '',
    email: '',
    phoneNumber: '',
  },

  selectedPlanId: '1',
  selectedPlanVariant: 'yearly',
  // selectedPlanVariant: 'monthly',
  addOns: [1, 2],
};

const defult = {
  plan: 1,
  period: 'monthly',
  addons: {
    id: 1,
    id: 2,
  },
};

const user = {
  name: 'Dawid',
  surname: 'K',
};

const available = [
  {
    id: 1,
    titleStep: 'Personal info',
    subtitle: 'your info',
    description: 'Please provide your name, email address, and phone number.',
    input: [
      {
        id: 1,
        typInput: 'text',
        name: 'Name',
        placeholder: ' e.g. Stephen King',
        required: 'required',
      },
      {
        id: 2,
        typInput: 'email',
        name: 'Email Address',
        placeholder: ' e.g. stephenking@lorem.com',
        required: 'required',
      },
      {
        id: 3,
        typInput: 'tel',
        name: 'Phone Number',
        placeholder: ' e.g. +1 234 567 890',
        required: 'required',
      },
    ],
  },
  {
    id: 2,
    titleStep: 'Select your plan',
    subtitle: 'select plan',
    description: 'You have the option of monthly or yearly billing.',
    plan: [
      {
        id: 1,
        title: 'Arcade',
        icon: 'icon-arcade.svg',
        description: {
          yearly: '2 months free',
          monthly: '',
        },
        price: {
          yearly: 90,
          monthly: 9,
        },
      },
      {
        id: 2,
        title: 'Advanced',
        icon: 'icon-advanced.svg',
        description: {
          yearly: '2 months free',
          monthly: '',
        },
        price: {
          yearly: 120,
          monthly: 12,
        },
      },
      {
        id: 3,
        title: 'Pro',
        icon: 'icon-pro.svg',
        description: {
          yearly: '2 months free',
          monthly: '',
        },
        price: {
          yearly: 150,
          monthly: 15,
        },
      },
    ],
  },
  {
    id: 3,
    titleStep: 'Pick add-ons',
    subtitle: 'add-ons',
    description: 'Add-ons help enhance your gaming experience.',
    addOns: [
      {
        id: 1,
        title: 'Online service',
        description: 'Access to multiplayer games',
        price: {
          yearly: 10,
          monthly: 1,
        },
      },
      {
        id: 2,
        title: 'Larger storage',
        description: 'Extra 1TB of cloud save',
        price: {
          yearly: 20,
          monthly: 2,
        },
      },
      {
        id: 3,
        title: 'Customizable profile',
        description: 'Custom theme on your profile',
        price: {
          yearly: 20,
          monthly: 2,
        },
      },
    ],
  },
  {
    id: 4,
    titleStep: 'Finishing up',
    subtitle: 'summary',
    description: 'Double-check everything looks OK before confirming.',
  },
];

// const avaialbeAddons = [
//   {
//     id: 1,
//     title: 'Addon 1',
//     price: {
//       yearly: 120,
//       monthly: 10,
//     },
//   },
//   {
//     id: 2,
//     title: 'Addon 2',
//     price: {
//       yearly: 120,
//       monthly: 12,
//     },
//   },
// ];
