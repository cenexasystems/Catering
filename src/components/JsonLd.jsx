import React from 'react';

export default function JsonLd() {
  const baseUrl = 'https://catering-opal-omega.vercel.app';

  const foodEstablishmentSchema = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${baseUrl}/#organization`,
    'name': 'Sri Sankaraa Catering Services',
    'url': baseUrl,
    'logo': `${baseUrl}/deity.png`,
    'image': `${baseUrl}/hero-image.png`,
    'telephone': '+91-99625-48644',
    'priceRange': '$$',
    'servesCuisine': ['South Indian', 'North Indian', 'Continental'],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'No.8/14, Sangam Street, Venkatapuram, Ambattur',
      'addressLocality': 'Chennai',
      'addressRegion': 'Tamil Nadu',
      'postalCode': '600053',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '13.1147',
      'longitude': '80.1548'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': '10:00',
      'closes': '21:00'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'reviewCount': '500'
    },
    'sameAs': [
      'https://www.instagram.com/srisankaraacateringservices',
      'https://www.instagram.com/srisankaraabrahmincatering'
    ],
    'review': [
      {
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': 'Ananya S.' },
        'datePublished': '2026-07-30',
        'reviewRating': { '@type': 'Rating', 'ratingValue': '5' },
        'reviewBody': 'The food was absolutely divine! Every single guest complimented the authentic traditional banana leaf sadhya. The service team was respectful, hygienic, and prompt.',
        'itemReviewed': { '@type': 'FoodEstablishment', 'name': 'Sri Sankaraa Catering Services' }
      },
      {
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': 'Rahul M.' },
        'datePublished': '2026-07-15',
        'reviewRating': { '@type': 'Rating', 'ratingValue': '5' },
        'reviewBody': 'Professional, punctual, and extraordinarily delicious. They handled our 500-person executive corporate conference with flawless coordination. Highly recommended!',
        'itemReviewed': { '@type': 'FoodEstablishment', 'name': 'Sri Sankaraa Catering Services' }
      },
      {
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': 'Kavitha R.' },
        'datePublished': '2026-07-10',
        'reviewRating': { '@type': 'Rating', 'ratingValue': '5' },
        'reviewBody': 'The live dosa and chaat counters were a massive hit! High hygiene standards, fresh ingredients, and polite live chefs.',
        'itemReviewed': { '@type': 'FoodEstablishment', 'name': 'Sri Sankaraa Catering Services' }
      },
      {
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': 'Vikram K.' },
        'datePublished': '2026-06-20',
        'reviewRating': { '@type': 'Rating', 'ratingValue': '5' },
        'reviewBody': 'They made our parents 25th anniversary celebration unforgettable. The dessert spread and Elaneer Payasam were out of this world!',
        'itemReviewed': { '@type': 'FoodEstablishment', 'name': 'Sri Sankaraa Catering Services' }
      },
      {
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': 'Priya K.' },
        'datePublished': '2026-06-15',
        'reviewRating': { '@type': 'Rating', 'ratingValue': '5' },
        'reviewBody': 'Excellent menu curation, warm hospitality, and pure traditional taste. Everyone was talking about the Pineapple Kesari and Medhu Vadai!',
        'itemReviewed': { '@type': 'FoodEstablishment', 'name': 'Sri Sankaraa Catering Services' }
      },
      {
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': 'Suresh Sundaram' },
        'datePublished': '2026-05-18',
        'reviewRating': { '@type': 'Rating', 'ratingValue': '5' },
        'reviewBody': 'Impeccable quality and pure authentic Brahmin taste. They catered to all our custom requirements seamlessly. Best caterers in Chennai!',
        'itemReviewed': { '@type': 'FoodEstablishment', 'name': 'Sri Sankaraa Catering Services' }
      },
      {
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': 'Dr. Meenakshi N.' },
        'datePublished': '2026-05-10',
        'reviewRating': { '@type': 'Rating', 'ratingValue': '5' },
        'reviewBody': 'Warm, piping hot meals served right on time. The Payasam and Vatha Kuzhambu were authentic home-style goodness.',
        'itemReviewed': { '@type': 'FoodEstablishment', 'name': 'Sri Sankaraa Catering Services' }
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': baseUrl
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Gallery',
        'item': `${baseUrl}/gallery`
      }
    ]
  };

  const menuListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Sri Sankaraa Downloadable Catering Menus & Packages',
    'description': 'Browse and download our 5 comprehensive wedding, Sadhya, and event catering menu booklets.',
    'numberOfItems': 5,
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Brahmin A5 Catering Booklet (2024)',
        'description': 'Comprehensive Brahmin wedding contract covering all rituals, seer, and multi-day feasts.',
        'url': `${baseUrl}/brochures/Sankara%20Catering%20Brahmin%20A5%20Catering%20Booklet%20%202024.pdf`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Sky Blue Four-Folding Menu List',
        'description': 'Extensive multi-day catering covering Reception, Muhurtham, and Seer items.',
        'url': `${baseUrl}/brochures/Sankaraa%20Catering%20Sky%20Blue%20Four%20folding%20Menu%20List.pdf`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Standard A5 Catering Booklet',
        'description': 'Classic South Indian tiffin, grand lunch feast, and dessert menu options.',
        'url': `${baseUrl}/brochures/Sankara%20Catering%20A5%20Catering%20Booklet.pdf`
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': 'Grand Wedding & Event Menu',
        'description': 'Multi-cuisine buffet, live counters, and traditional Sadhya catering options.',
        'url': `${baseUrl}/brochures/Sankara%20Catering%20%20Menu.pdf`
      },
      {
        '@type': 'ListItem',
        'position': 5,
        'name': 'Sky Blue Sheet Menu Card',
        'description': 'Custom event menu selections for engagements, birthdays, and corporate celebrations.',
        'url': `${baseUrl}/brochures/Sankaraa%20Catering%20Sky%20Blue%20sheet%20Menu%20Card.pdf`
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Do you provide catering services outside Chennai?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes! Sri Sankaraa Catering Services provides wedding, corporate, and grand event catering in Ambattur, Chennai, and across surrounding districts in Tamil Nadu.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is included in the traditional South Indian Sadhya package?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Our traditional South Indian banana leaf Sadhya includes payasam, medhu vadai, authentic sambar, rasam, mor kuzhambu, aviayl, poriyal, usili, appalam, paruppu ghee, and filter coffee.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is Sri Sankaraa Catering Services FSSAI certified?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, Sri Sankaraa Catering Services is 100% FSSAI certified, strictly adhering to high food safety, hygiene, and fresh ingredient standards.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Do you offer live counter catering options for events in Chennai?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, we provide live dosa counters, chaat stations, hot filter coffee counters, and royal dessert spreads for weddings, birthday parties, and corporate galas.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How far in advance should we book catering services for weddings?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We recommend booking at least 2 to 4 weeks in advance for auspicious wedding dates to ensure full menu customization and seamless event coordination.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What cuisines do you offer for corporate and wedding buffets?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We specialize in authentic South Indian Brahmin meals, North Indian delicacies, and Continental dishes for multi-cuisine buffet spreads.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(foodEstablishmentSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
