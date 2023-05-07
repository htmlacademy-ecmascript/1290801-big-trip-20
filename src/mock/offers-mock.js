const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 'b4b4fa1c-f63c-41ef-83f0-7206f3348e32',
        'title': 'Upgrade to a business class',
        'price': 197
      },
      {
        'id': '6d1f61b0-4ced-4929-bb23-b15ae2822273',
        'title': 'Choose the radio station',
        'price': 32
      },
      {
        'id': 'ee02abe7-1121-4b86-9c40-8f0f7ebb18c4',
        'title': 'Choose temperature',
        'price': 156
      },
      {
        'id': '86385b20-6691-4785-bdcf-025f0151fc1f',
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 37
      },
      {
        'id': '573d817e-d188-428f-a481-749ee9a14110',
        'title': 'Drive slowly',
        'price': 49
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': '6f110b17-0bcf-483e-9b82-a080c2eb99b4',
        'title': 'Infotainment system',
        'price': 148
      },
      {
        'id': 'c821cd37-6844-4689-88f5-a62b99944000',
        'title': 'Order meal',
        'price': 127
      },
      {
        'id': 'f195a78b-de87-469a-81ab-5995c04d6147',
        'title': 'Choose seats',
        'price': 48
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': '389017d0-623a-41a1-8182-52837957a033',
        'title': 'Book a taxi at the arrival point',
        'price': 191
      },
      {
        'id': '77193dd9-36bb-4e79-9e52-b5a5f6bf9515',
        'title': 'Order a breakfast',
        'price': 145
      },
      {
        'id': 'c6350636-2623-4c20-89e6-a75302a0d348',
        'title': 'Wake up at a certain time',
        'price': 166
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 'f57dac90-27e3-40f7-826e-9430e13da2f0',
        'title': 'Choose meal',
        'price': 76
      },
      {
        'id': '8f96a473-922b-4626-953f-012b98cb657b',
        'title': 'Choose seats',
        'price': 138
      },
      {
        'id': '70b820b7-2a52-4688-b499-0633a4c1e39a',
        'title': 'Upgrade to comfort class',
        'price': 169
      },
      {
        'id': '48e22e76-d709-497b-b160-7c5f63c859f0',
        'title': 'Upgrade to business class',
        'price': 145
      },
      {
        'id': 'e5a45584-45ca-40a7-80cb-a63d136e8057',
        'title': 'Add luggage',
        'price': 38
      },
      {
        'id': '515c2ec8-36f3-4bc9-ac33-f07e9c6e3ee2',
        'title': 'Business lounge',
        'price': 182
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': '3906efa5-3ca0-4700-89a1-7e88ad80974d',
        'title': 'Choose the time of check-in',
        'price': 54
      },
      {
        'id': 'a7965ac3-b3cb-49d3-8c07-01b822f54b60',
        'title': 'Choose the time of check-out',
        'price': 101
      },
      {
        'id': 'ac6a4c74-a6cb-4f70-bcc4-15d60a62952d',
        'title': 'Add breakfast',
        'price': 32
      },
      {
        'id': '78df120e-22d4-4b68-83cd-75efe0e5b29f',
        'title': 'Laundry',
        'price': 32
      },
      {
        'id': '419861a0-171b-480c-bf57-971e6d0db854',
        'title': 'Order a meal from the restaurant',
        'price': 39
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': '51ccd79e-1c43-45d1-ba0e-3164c80466391',
        'title': 'Test Offer',
        'price': 1
      },
      {
        'id': '51ccd79e-1c43-45d1-ba0e-3164c80466392',
        'title': 'Test Offer',
        'price': 2
      },
      {
        'id': '51ccd79e-1c43-45d1-ba0e-3164c80466393',
        'title': 'Test Offer',
        'price': 3
      },
      {
        'id': '51ccd79e-1c43-45d1-ba0e-3164c80466394',
        'title': 'Test Offer',
        'price': 4
      },
      {
        'id': '51ccd79e-1c43-45d1-ba0e-3164c80466395',
        'title': 'Test Offer',
        'price': 5
      },
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': '51ccd79e-1c43-45d1-ba0e-3164c8046639',
        'title': 'Choose meal',
        'price': 171
      },
      {
        'id': '38dcaba1-2ccb-4e49-ab8f-cc24fe38dbb0',
        'title': 'Choose seats',
        'price': 186
      },
      {
        'id': 'fe66a3b2-8023-42f1-939b-d4c94503be8c',
        'title': 'Upgrade to comfort class',
        'price': 70
      },
      {
        'id': '350a4f66-bf21-4ff9-a84d-ea7ad122510e',
        'title': 'Upgrade to business class',
        'price': 100
      },
      {
        'id': '2777a699-3cde-4e62-8965-ef6e366a6c3c',
        'title': 'Add luggage',
        'price': 200
      },
      {
        'id': 'b0faafe3-0134-49da-b181-99c5df271b3f',
        'title': 'Business lounge',
        'price': 115
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': '047ff914-f5b2-4a18-add9-6bc09fa3a74f',
        'title': 'With automatic transmission',
        'price': 51
      },
      {
        'id': 'f10c4d3a-0f3c-4e2d-b31a-212aeed3327d',
        'title': 'With air conditioning',
        'price': 123
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': '64124ac4-a701-44d4-b73f-223f302aea91',
        'title': 'Choose live music',
        'price': 134
      },
      {
        'id': 'd903fd0b-93ee-4e53-a535-b11757c55231',
        'title': 'Choose VIP area',
        'price': 98
      }
    ]
  }
];

function getOffers(type){
  if (!type) {
    return mockOffers;
  } else {
    return mockOffers.find((objWithOffers) => objWithOffers.type === type);
  }
}

export {getOffers};
