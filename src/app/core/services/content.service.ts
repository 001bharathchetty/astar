import { Injectable } from '@angular/core';
import { APP_VERSION } from '../version';

export interface NextPathItem {
  badge: string;
  title: string;
  description: string;
  url: string;
  actionText: string;
  ariaLabel?: string;
}

export type PageKey =
  | 'home'
  | 'about'
  | 'services'
  | 'safety-quality'
  | 'projects'
  | 'contact';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  readonly version = APP_VERSION;

  readonly brand = {
    name: 'AStar Electricals',
    legalName: 'AStar Electricals',
    shortName: 'AStar',
    tagline: 'Powering Quality. Built on Trust.',
    focus: 'Electrical contracting for commercial spaces',
    markets: 'Bengaluru · Chennai · Hyderabad · Pan-India',
    marketsArray: ['Bengaluru', 'Chennai', 'Hyderabad', 'Pan-India'],
    phone: '+91 98800 57744',
    phoneRaw: '+919880057744',
    whatsappUrl: 'https://wa.me/919880057744?text=Hello%20AStar%20Electricals%2C%20I%20would%20like%20to%20discuss%20a%20commercial%20project.',
    gstin: '29ACPFA5825L1ZR',
    hours: 'Monday – Saturday, 9:30 AM – 8:30 PM',
    address: {
      floor: 'Ground Floor, #7, 3rd Cross, 3rd Main Road',
      landmark: 'Near Javeria School',
      area: 'Saraipalya, Thanisandra',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560077',
      country: 'India',
      lines: [
        'Ground Floor, #7, 3rd Cross, 3rd Main Road',
        'Near Javeria School, Saraipalya, Thanisandra',
        'Bengaluru, Karnataka – 560077, India'
      ],
      full: 'Ground Floor, #7, 3rd Cross, 3rd Main Road, Near Javeria School, Saraipalya, Thanisandra, Bengaluru, Karnataka – 560077, India'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Ground+Floor+7+3rd+Cross+3rd+Main+Road+Near+Javeria+School+Saraipalya+Thanisandra+Bengaluru+560077'
  };

  // 1. Home Page
  readonly home = {
    badge: 'Commercial Electrical Contracting',
    hero: {
      headline: 'Electrical Expertise for Commercial Spaces.',
      subheadline: 'Electrical contracting for the spaces where business happens.',
      lead: 'AStar Electricals works with commercial property developers, builders, construction companies, and project teams to deliver electrical works aligned with project requirements, specifications, and construction schedules.',
      primaryCta: 'Discuss a Project',
      secondaryCta: 'Explore Our Capabilities',
      marketTag: 'Bengaluru · Chennai · Hyderabad · Across India'
    },
    intro: {
      title: 'The Systems Behind Every Commercial Space.',
      paragraphs: [
        'Offices, retail environments, workplaces, and other commercial properties depend on electrical systems that are planned and executed with care.',
        'Successful delivery takes more than installation. It requires an understanding of project specifications, coordination with construction teams, attention to site conditions, and disciplined execution.',
        'AStar Electricals focuses on electrical contracting for commercial spaces, working with project stakeholders to help turn plans and specifications into functioning environments.'
      ]
    },
    capabilities: {
      eyebrow: 'Scope & Execution',
      title: 'Electrical Works, Planned Around the Project.',
      items: [
        {
          title: 'Commercial Electrical Installation',
          description: 'Electrical installation works for commercial construction projects, delivered in line with the agreed scope and specifications.',
          icon: 'precision_manufacturing'
        },
        {
          title: 'Construction-Stage Electrical Works',
          description: 'Electrical work coordinated with construction activities, project sequencing, and site requirements.',
          icon: 'construction'
        },
        {
          title: 'Electrical Systems and Infrastructure',
          description: "Execution of electrical systems within the project's approved technical scope.",
          icon: 'account_tree'
        },
        {
          title: 'Project Coordination',
          description: 'Coordination with developers, builders, consultants, contractors, and relevant site teams.',
          icon: 'hub'
        },
        {
          title: 'Scope-Specific Contracting',
          description: 'Project proposals shaped around drawings, specifications, site conditions, and agreed deliverables.',
          icon: 'design_services'
        }
      ],
      ctaText: 'Explore Our Services',
      ctaUrl: '/services'
    },
    clients: {
      eyebrow: 'Stakeholders',
      title: 'Supporting the Teams That Build Commercial Spaces.',
      groups: [
        {
          title: 'Commercial Property Developers',
          description: 'Electrical contracting support for commercial developments and property projects.',
          icon: 'apartment'
        },
        {
          title: 'Builders and Construction Companies',
          description: 'Execution aligned with construction requirements, project sequencing, and agreed specifications.',
          icon: 'domain'
        },
        {
          title: 'Project Management & Design Consultants',
          description: 'Coordination around project documentation, technical requirements, and defined scopes of work.',
          icon: 'draw'
        },
        {
          title: 'Commercial Property Owners and Operators',
          description: "Electrical contracting for eligible commercial projects, subject to AStar's confirmed scope of services.",
          icon: 'corporate_fare'
        }
      ]
    },
    approach: {
      eyebrow: 'Execution Discipline',
      title: 'Good Execution Starts Before Work Begins.',
      steps: [
        {
          number: '01',
          name: 'Understand',
          description: 'Review the project brief, technical requirements, drawings, scope, and delivery expectations.'
        },
        {
          number: '02',
          name: 'Coordinate',
          description: 'Align the electrical scope with construction activities and relevant project stakeholders.'
        },
        {
          number: '03',
          name: 'Execute',
          description: 'Carry out the agreed work with attention to specifications, workmanship, and site requirements.'
        },
        {
          number: '04',
          name: 'Deliver',
          description: 'Work toward agreed quality expectations, project milestones, and completion requirements.'
        }
      ]
    },
    geography: {
      eyebrow: 'Operating Footprint',
      title: 'Regional Foundations. Pan-India Reach.',
      body: 'With Bengaluru, Chennai, and Hyderabad as base markets, AStar Electricals serves commercial electrical contracting requirements with a pan-India outlook.',
      subtext: 'Every project begins with a clear understanding of its location, requirements, scope, and delivery expectations.'
    },
    closingCta: {
      title: 'Planning a Commercial Project?',
      description: 'Tell us about your project and electrical contracting requirements.',
      actionText: 'Talk to AStar Electricals'
    }
  };

  // 2. About Page
  readonly about = {
    badge: 'About AStar',
    title: 'Electrical Contracting for the Commercial Built Environment.',
    subtitle: 'Built on clear communication, disciplined execution, and long-term accountability.',
    intro: [
      'AStar Electricals focuses on electrical contracting for commercial spaces, where technical requirements, construction schedules, and coordination between project teams all shape the final outcome.',
      'Our work is centred on understanding the agreed scope, coordinating with project stakeholders, and executing electrical works in line with project requirements.',
      'We recognise that dependable delivery is built through clear communication, careful planning, attention to detail, and accountability throughout the project.'
    ],
    values: [
      {
        title: 'Quality in execution',
        description: 'Attention to workmanship, specifications, and the details that matter on site.'
      },
      {
        title: 'Coordination in practice',
        description: 'Working with the wider construction team so electrical activities align with the project programme.'
      },
      {
        title: 'Responsibility in delivery',
        description: 'Clarity around the agreed scope, requirements, commitments, and communication.'
      },
      {
        title: 'A long-term outlook',
        description: 'Building professional relationships through consistent work and dependable coordination.'
      }
    ],
    footprint: {
      title: 'Where We Work',
      description: 'AStar Electricals is based across the Bengaluru, Chennai, and Hyderabad markets, with pan-India project reach.'
    },
    cta: {
      headline: 'Ready to align on your commercial project scope?',
      actionText: 'Discuss Your Project'
    }
  };

  // 3. Services Page
  readonly services = {
    badge: 'Our Capabilities',
    title: 'Commercial Electrical Contracting, Aligned to the Project.',
    subtitle: 'Shaped around drawings, technical requirements, site conditions, and construction sequencing.',
    lead: "Commercial projects have different technical requirements, operating needs, site conditions, and delivery schedules. AStar's electrical contracting scope is presented in line with verified capabilities and project-specific agreements.",
    items: [
      {
        number: '01',
        title: 'Commercial Electrical Installation',
        description: 'Electrical installation works for eligible commercial construction projects, executed in compliance with project drawings, engineering standards, and load requirements.',
        deliverables: [
          'Primary & secondary electrical distribution',
          'Modular power networks for workspaces',
          'Certified wiring and conduit runs',
          'System integrity and termination checks'
        ]
      },
      {
        number: '02',
        title: 'Construction-Stage Electrical Works',
        description: 'Electrical work coordinated with the construction programme, site access, project sequencing, and structural phases.',
        deliverables: [
          'Pre-pour slab and embedded conduit execution',
          'Shaft and riser electrical containment',
          'Coordination with civil and MEP trades',
          'Staged milestone inspections'
        ]
      },
      {
        number: '03',
        title: 'Electrical Systems and Infrastructure',
        description: "Execution of electrical systems within the approved technical scope and project specifications.",
        deliverables: [
          'Main distribution & sub-distribution boards',
          'Switchgear and protection device installation',
          'Earthing and lightning protection interfaces',
          'Dedicated commercial power circuits'
        ]
      },
      {
        number: '04',
        title: 'Project Coordination',
        description: 'Coordination with developers, builders, consultants, other contractors, and on-site engineering teams.',
        deliverables: [
          'Technical drawing review and site verification',
          'Material staging and inventory alignment',
          'Inter-trade conflict resolution on site',
          'Progress reporting against programme milestones'
        ]
      },
      {
        number: '05',
        title: 'Project-Specific Contracting',
        description: 'Scope development and delivery planning based on project documentation, site requirements, and agreed deliverables.',
        deliverables: [
          'Bill of Materials (BOM) scope clarification',
          'Site condition evaluations',
          'Milestone-linked commercial contracting',
          'Handover documentation and testing verification'
        ]
      }
    ],
    discuss: {
      title: 'Discuss Your Requirements',
      body: 'Share the project location, type of commercial space, expected timeline, and available scope documents to begin a conversation.',
      ctaText: 'Enquire About a Project'
    }
  };

  // 4. Safety & Quality Page
  readonly safetyQuality = {
    badge: 'Standards & Discipline',
    title: 'Quality Is in the Execution.',
    subtitle: 'Electrical work carries responsibility. Built on real procedures, site discipline, and day-to-day accountability.',
    lead: 'Planning, coordination, workmanship, and adherence to applicable project requirements all contribute to the quality of the finished work. AStar Electricals approaches safety and quality through practices that reflect how projects are managed on the ground.',
    qualityFocus: {
      title: 'Quality Focus',
      description: 'Disciplined workmanship aligned with engineering specifications.',
      points: [
        'Work strictly aligned with approved drawings and project specifications.',
        'Attention to installation quality and execution details at every junction and termination.',
        'Active coordination with relevant project stakeholders and consultants.',
        'Appropriate recording and prompt resolution of identified site issues.',
        'Compliance with applicable project approvals, standards, and milestone sign-offs.'
      ]
    },
    safetyFocus: {
      title: 'Safety Focus',
      description: 'Prioritizing on-site well-being, hazard prevention, and compliance.',
      points: [
        'Strict adherence to applicable safety requirements and site rules.',
        'Coordinating with site safety officers, main contractors, and MEP teams.',
        'Supporting safe work practices and proper PPE within the agreed project scope.',
        'Following applicable inspection, testing, and approval procedures before energisation.'
      ]
    },
    callout: {
      title: 'Built on Accountability.',
      body: 'Quality and safety should be demonstrated through real procedures, records, and day-to-day project practices — not just statements on a website.'
    }
  };

  // 5. Projects Page
  readonly projects = {
    badge: 'Documented Portfolio',
    title: 'Commercial Projects. Clearly Documented.',
    subtitle: 'Authentic execution across office, retail, and commercial developments.',
    lead: "A project portfolio should show the nature of AStar's commercial electrical contracting work through verified details, technical scopes, and disciplined delivery.",
    categories: [
      {
        id: 'workplace',
        name: 'Office & Workplace Projects',
        description: 'Corporate office fit-outs, commercial tech campuses, and modern workspace power infrastructure.'
      },
      {
        id: 'retail',
        name: 'Retail & Commercial Developments',
        description: 'Retail stores, shopping arcades, commercial showrooms, and multi-tenant facilities.'
      },
      {
        id: 'facilities',
        name: 'Other Commercial Facilities',
        description: 'Logistics hubs, commercial storage, hospitality venues, and mixed-use properties.'
      }
    ],
    sampleCases: [
      {
        title: 'Commercial Office Workspace Fit-out',
        location: 'Outer Ring Road, Bengaluru',
        category: 'Office & Workplace',
        status: 'Completed',
        scope: 'Complete internal electrical installation, sub-distribution boards, modular power routing, and coordinated ceiling containment.',
        timeline: 'Delivered to Schedule'
      },
      {
        title: 'Multi-Storey Commercial Development',
        location: 'Whitefield, Bengaluru',
        category: 'Commercial Development',
        status: 'Completed',
        scope: 'Construction-stage electrical works, electrical risers, main distribution infrastructure, and common area power networks.',
        timeline: 'Multi-Phase Delivery'
      },
      {
        title: 'Regional Retail Showroom & Center',
        location: 'Anna Salai, Chennai',
        category: 'Retail & Commercial',
        status: 'Completed',
        scope: 'Dedicated commercial circuits, specialized display lighting distribution, DB terminations, and testing sign-offs.',
        timeline: 'Turnkey Handover'
      }
    ],
    cta: {
      headline: 'Have a commercial project in development or tendering?',
      actionText: 'Discuss a Similar Project'
    }
  };

  // 6. Contact Page
  readonly contact = {
    badge: 'Project Inquiries',
    title: "Let's Talk About Your Commercial Project.",
    subtitle: 'Planning a commercial development or evaluating electrical contracting requirements? Connect directly with our team.',
    lead: 'Tell us about your project location, scale, and expected delivery timeline. We will review your documentation and coordinate a scope discussion.',
    intents: [
      { id: 'new-development', label: 'Commercial Construction / New Development' },
      { id: 'fitout', label: 'Office Fit-out / Workplace Contracting' },
      { id: 'retail', label: 'Retail / Showroom Electrical Works' },
      { id: 'contracting', label: 'Sub-contracting / Specific Scope Requirement' },
      { id: 'consultation', label: 'General Project Discussion' }
    ]
  };

  // Next Logical Paths mapping
  getNextPaths(page: PageKey): NextPathItem[] {
    const paths: Record<PageKey, NextPathItem[]> = {
      home: [
        {
          badge: '01 / About AStar',
          title: 'Contracting for Commercial Spaces',
          description: 'Learn about our commercial electrical background, core principles, and base markets.',
          url: '/about',
          actionText: 'Read About AStar'
        },
        {
          badge: '02 / Services',
          title: 'Capabilities & Scopes',
          description: 'Explore commercial installations, construction-stage works, and technical infrastructure.',
          url: '/services',
          actionText: 'View Services'
        },
        {
          badge: '03 / Safety & Quality',
          title: 'Execution Discipline',
          description: 'Understand how real site procedures, inspections, and accountability guide our delivery.',
          url: '/safety-quality',
          actionText: 'Our Standards'
        }
      ],
      about: [
        {
          badge: '01 / Services',
          title: 'Commercial Capabilities',
          description: 'Detailed breakdown of our contracting scopes, systems, and site coordination.',
          url: '/services',
          actionText: 'Explore Services'
        },
        {
          badge: '02 / Safety & Quality',
          title: 'Quality in the Execution',
          description: 'Review our site inspection, safety, and workmanship practices.',
          url: '/safety-quality',
          actionText: 'Safety & Quality'
        },
        {
          badge: '03 / Contact',
          title: 'Start a Project Conversation',
          description: 'Connect directly with our team in Bengaluru, Chennai, or Hyderabad.',
          url: '/contact',
          actionText: 'Contact AStar'
        }
      ],
      services: [
        {
          badge: '01 / Safety & Quality',
          title: 'Accountability on Site',
          description: 'How our execution standards ensure dependable delivery across commercial builds.',
          url: '/safety-quality',
          actionText: 'View Standards'
        },
        {
          badge: '02 / Projects',
          title: 'Documented Work',
          description: 'See how we approach commercial projects with clarity and verification.',
          url: '/projects',
          actionText: 'View Projects'
        },
        {
          badge: '03 / Contact',
          title: 'Discuss Scope',
          description: 'Submit drawings, project timelines, and requirements for scope evaluation.',
          url: '/contact',
          actionText: 'Discuss Scope'
        }
      ],
      'safety-quality': [
        {
          badge: '01 / Projects',
          title: 'Portfolio & Case Studies',
          description: 'Commercial installations executed in line with approved engineering specifications.',
          url: '/projects',
          actionText: 'Explore Projects'
        },
        {
          badge: '02 / About AStar',
          title: 'Our Background & Values',
          description: 'The foundation of trust, communication, and workmanship behind AStar.',
          url: '/about',
          actionText: 'About AStar'
        },
        {
          badge: '03 / Contact',
          title: 'Discuss Your Standards',
          description: 'Align on project safety, testing protocols, and compliance requirements.',
          url: '/contact',
          actionText: 'Contact Us'
        }
      ],
      projects: [
        {
          badge: '01 / Services',
          title: 'Our Service Scopes',
          description: 'Review the technical installation and construction-stage capabilities we offer.',
          url: '/services',
          actionText: 'View Services'
        },
        {
          badge: '02 / Safety & Quality',
          title: 'Standards & Protocols',
          description: 'How we manage quality controls, site safety, and milestone sign-offs.',
          url: '/safety-quality',
          actionText: 'Quality Focus'
        },
        {
          badge: '03 / Contact',
          title: 'Discuss a Similar Project',
          description: 'Have a commercial project in planning? Share details with our team.',
          url: '/contact',
          actionText: 'Start a Project'
        }
      ],
      contact: [
        {
          badge: '01 / Home',
          title: 'AStar Electricals Overview',
          description: 'Return to the main overview of commercial electrical contracting capabilities.',
          url: '/',
          actionText: 'Go to Home'
        },
        {
          badge: '02 / Services',
          title: 'Detailed Service Scopes',
          description: 'Explore the full range of commercial electrical works we execute.',
          url: '/services',
          actionText: 'Explore Services'
        },
        {
          badge: '03 / About',
          title: 'About AStar Electricals',
          description: 'Read about our company philosophy, operating footprint, and guiding values.',
          url: '/about',
          actionText: 'Read About Us'
        }
      ]
    };

    return paths[page] || paths.home;
  }
}
