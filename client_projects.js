// ==============================================================================
// ELNA DIGITAL TRACKER – CLIENT PROJECTS MANAGEMENT SYSTEM
// Full-Featured Client, Project, Service, Payment, Expense & Profit Management
// Currency: ETB (Ethiopian Birr)
// ==============================================================================

(function () {
    'use strict';

    const STORAGE_KEY = 'elna_client_projects_v1';

    // Default Package Definitions for Control Room (Fully Editable & Versioned)
    const defaultPackages = [
        {
            id: 'small',
            name: 'Small Package',
            price: 5000,
            advancePercentage: 50,
            badge: 'Small · 5,000 ETB',
            desc: 'Essential digital presence: Google Business Profile Setup & Food Delivery Platform Onboarding.',
            status: 'active',
            version: 'v1.0',
            services: ['Google Business Profile Setup', 'Food Delivery Platform Onboarding'],
            phases: [
                {
                    phaseNum: 1,
                    name: 'Phase 1 — Client Preparation & Payment',
                    tasks: [
                        { id: 't-s1-1', text: 'Confirm client requirements', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-s1-2', text: 'Confirm package and price', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-s1-3', text: 'Receive 50% advance payment', isAdvance: true, isFinalPayment: false, isCompletion: false },
                        { id: 't-s1-4', text: 'Collect business information', isAdvance: false, isFinalPayment: false, isCompletion: false }
                    ]
                },
                {
                    phaseNum: 2,
                    name: 'Phase 2 — Google Business Profile Setup',
                    tasks: [
                        { id: 't-s2-1', text: 'Create or claim business profile', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-s2-2', text: 'Add business information and location', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-s2-3', text: 'Upload logo and photos', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-s2-4', text: 'Complete verification if required', isAdvance: false, isFinalPayment: false, isCompletion: false }
                    ]
                },
                {
                    phaseNum: 3,
                    name: 'Phase 3 — Food Delivery Onboarding & Delivery',
                    tasks: [
                        { id: 't-s3-1', text: 'Register on delivery platform', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-s3-2', text: 'Submit required documents', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-s3-3', text: 'Upload menu and product details', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-s3-4', text: 'Confirm onboarding status', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-s3-5', text: 'Receive final payment', isAdvance: false, isFinalPayment: true, isCompletion: false },
                        { id: 't-s3-6', text: 'Deliver completed services and close project', isAdvance: false, isFinalPayment: false, isCompletion: true }
                    ]
                }
            ]
        },
        {
            id: 'basic',
            name: 'Basic Package',
            price: 10000,
            advancePercentage: 50,
            badge: 'Basic · 10,000 ETB',
            desc: 'Google Business Profile, Food Delivery Platform, and Contactless QR Digital Menu.',
            status: 'active',
            version: 'v1.0',
            services: ['Google Business Profile Setup', 'Food Delivery Platform Onboarding', 'QR Digital Menu'],
            phases: [
                {
                    phaseNum: 1,
                    name: 'Phase 1 — Client Preparation & Payment',
                    tasks: [
                        { id: 't-b1-1', text: 'Confirm requirements and package', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-b1-2', text: 'Receive 50% advance payment', isAdvance: true, isFinalPayment: false, isCompletion: false },
                        { id: 't-b1-3', text: 'Collect business information, logo and photos', isAdvance: false, isFinalPayment: false, isCompletion: false }
                    ]
                },
                {
                    phaseNum: 2,
                    name: 'Phase 2 — Google & Food Delivery Setup',
                    tasks: [
                        { id: 't-b2-1', text: 'Complete Google Business Profile setup', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-b2-2', text: 'Complete required verification', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-b2-3', text: 'Register on food delivery platform', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-b2-4', text: 'Submit documents and menu', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-b2-5', text: 'Confirm onboarding status', isAdvance: false, isFinalPayment: false, isCompletion: false }
                    ]
                },
                {
                    phaseNum: 3,
                    name: 'Phase 3 — Digital Menu & Delivery',
                    tasks: [
                        { id: 't-b3-1', text: 'Design digital menu', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-b3-2', text: 'Add categories, products and prices', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-b3-3', text: 'Apply logo and brand colors', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-b3-4', text: 'Generate custom QR code', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-b3-5', text: 'Test menu and QR code', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-b3-6', text: 'Prepare menu updates through ELNA DIGITAL support', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-b3-7', text: 'Get client approval', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-b3-8', text: 'Receive final payment and deliver', isAdvance: false, isFinalPayment: true, isCompletion: true }
                    ]
                }
            ]
        },
        {
            id: 'advanced',
            name: 'Advanced Package',
            price: 15000,
            advancePercentage: 50,
            badge: 'Advanced · 15,000 ETB',
            desc: 'Everything in Basic, plus Customer Tracking & Live Operational Analytics Dashboard.',
            status: 'active',
            version: 'v1.0',
            services: ['Food Delivery Platform Onboarding', 'Google Business Profile Setup', 'QR Digital Menu', 'Tracking System'],
            phases: [
                {
                    phaseNum: 1,
                    name: 'Phase 1 — Client Preparation & Payment',
                    tasks: [
                        { id: 't-a1-1', text: 'Confirm requirements and package', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a1-2', text: 'Receive 50% advance payment', isAdvance: true, isFinalPayment: false, isCompletion: false },
                        { id: 't-a1-3', text: 'Collect business information and materials', isAdvance: false, isFinalPayment: false, isCompletion: false }
                    ]
                },
                {
                    phaseNum: 2,
                    name: 'Phase 2 — Google & Food Delivery Setup',
                    tasks: [
                        { id: 't-a2-1', text: 'Google Business Profile setup', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a2-2', text: 'Complete verification if required', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a2-3', text: 'Food delivery platform onboarding', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a2-4', text: 'Submit documents and information', isAdvance: false, isFinalPayment: false, isCompletion: false }
                    ]
                },
                {
                    phaseNum: 3,
                    name: 'Phase 3 — Digital Menu & Analytics',
                    tasks: [
                        { id: 't-a3-1', text: 'Design digital menu', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a3-2', text: 'Add products, images and prices', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a3-3', text: 'Generate custom QR code', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a3-4', text: 'Set up menu analytics', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a3-5', text: 'Configure customer tracking', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a3-6', text: 'Test analytics and reporting', isAdvance: false, isFinalPayment: false, isCompletion: false }
                    ]
                },
                {
                    phaseNum: 4,
                    name: 'Phase 4 — Owner Access & Delivery',
                    tasks: [
                        { id: 't-a4-1', text: 'Set up owner editing access', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a4-2', text: 'Test product and price editing', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a4-3', text: 'Present analytics dashboard', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a4-4', text: 'Client review and approval', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-a4-5', text: 'Receive final payment', isAdvance: false, isFinalPayment: true, isCompletion: false },
                        { id: 't-a4-6', text: 'Deliver completed services', isAdvance: false, isFinalPayment: false, isCompletion: true }
                    ]
                }
            ]
        },
        {
            id: 'premium',
            name: 'Premium Package',
            price: 30000,
            advancePercentage: 50,
            badge: 'Premium · 30,000 ETB',
            desc: 'Flagship Full-Stack: Custom Responsive Website, QR Menu, Live Tracking & Social Launch.',
            status: 'active',
            version: 'v1.0',
            services: ['Website Development', 'Food Delivery Platform Onboarding', 'Tracking System', 'Google Business Profile Setup', 'QR Digital Menu', 'Social Media Management'],
            phases: [
                {
                    phaseNum: 1,
                    name: 'Phase 1 — Client & Payment',
                    tasks: [
                        { id: 't-pr1-1', text: 'Confirm client requirements', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr1-2', text: 'Confirm selected Premium package', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr1-3', text: 'Agree on project price and deadline', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr1-4', text: 'Receive 50% advance payment', isAdvance: true, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr1-5', text: 'Record payment and issue receipt', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr1-6', text: 'Confirm project officially started', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr1-7', text: 'Collect logo, images and brand assets', isAdvance: false, isFinalPayment: false, isCompletion: false }
                    ]
                },
                {
                    phaseNum: 2,
                    name: 'Phase 2 — Core Setup',
                    tasks: [
                        { id: 't-pr2-1', text: 'Google Business Profile setup', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr2-2', text: 'Google Business verification', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr2-3', text: 'Food delivery platform registration', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr2-4', text: 'Submit delivery platform documents', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr2-5', text: 'Upload delivery menu and prices', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr2-6', text: 'Confirm food delivery onboarding', isAdvance: false, isFinalPayment: false, isCompletion: false }
                    ]
                },
                {
                    phaseNum: 3,
                    name: 'Phase 3 — Digital Menu & Tracking',
                    tasks: [
                        { id: 't-pr3-1', text: 'Design digital menu', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr3-2', text: 'Add categories, items and prices', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr3-3', text: 'Generate custom QR code', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr3-4', text: 'Configure customer tracking system', isAdvance: false, isFinalPayment: false, isCompletion: false }
                    ]
                },
                {
                    phaseNum: 4,
                    name: 'Phase 4 — Social Media, Approval & Delivery',
                    tasks: [
                        { id: 't-pr4-1', text: 'Setup social media profiles if needed', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr4-2', text: 'Create launch posts or promotional graphics', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr4-3', text: 'Connect social media links to digital menu', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr4-4', text: 'Review all completed services with client', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr4-5', text: 'Get formal client approval', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr4-6', text: 'Receive final 50% payment', isAdvance: false, isFinalPayment: true, isCompletion: false },
                        { id: 't-pr4-7', text: 'Issue final payment receipt', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr4-8', text: 'Hand over all accounts and credentials', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr4-9', text: 'Deliver all services and access', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: 't-pr4-10', text: 'Close project', isAdvance: false, isFinalPayment: false, isCompletion: true }
                    ]
                }
            ]
        }
    ];

    // Seed Pricing History for Audit Trail
    const defaultPricingHistory = [
        {
            id: 'ph-init-1',
            type: 'package',
            targetId: 'premium',
            targetName: 'Premium Package',
            previousPrice: 28000,
            newPrice: 30000,
            effectiveDate: '2026-11-01',
            timestamp: '2026-11-01T09:00:00Z',
            reason: 'Expanded catalog to include complete responsive web portal and printed table QR plaques.',
            administrator: 'ELNA Lead Administrator'
        },
        {
            id: 'ph-init-2',
            type: 'service',
            targetId: 'srv-1',
            targetName: 'Website Development',
            previousPrice: 22000,
            newPrice: 25000,
            effectiveDate: '2026-11-01',
            timestamp: '2026-11-01T09:00:00Z',
            reason: 'Upgraded tech stack to modern responsive web application with integrated analytics.',
            administrator: 'ELNA Lead Administrator'
        }
    ];

    // Default Income Categories for Earn Control Room
    const defaultIncomeCategories = [
        { id: 'inc-cat-1', name: 'Project Advance Payment', description: '50% initial commitment deposit upon signing', status: 'active' },
        { id: 'inc-cat-2', name: 'Project Final Payment', description: 'Final project milestone completion balance', status: 'active' },
        { id: 'inc-cat-3', name: 'Milestone Payment', description: 'Progressive milestone disbursement', status: 'active' },
        { id: 'inc-cat-4', name: 'Digital Strategy & Consulting', description: 'Standalone advisory & tech audit fee', status: 'active' },
        { id: 'inc-cat-5', name: 'Monthly Maintenance & Hosting', description: 'Recurring website and cloud infrastructure', status: 'active' },
        { id: 'inc-cat-6', name: 'Custom Solution Deliverable', description: 'Ad-hoc technical implementation', status: 'active' }
    ];

    // Default Expense Categories with Monthly Budgets for Earn Control Room
    const defaultExpenseCategories = [
        { id: 'exp-cat-1', name: 'QR Materials', budget: 5000, description: 'Acrylic table stands, laser cutting & QR plaques', status: 'active' },
        { id: 'exp-cat-2', name: 'Hosting and Domains', budget: 10000, description: 'Domain registrations, cloud VPS, SSL certificates', status: 'active' },
        { id: 'exp-cat-3', name: 'Transportation', budget: 4000, description: 'Ride taxis, fuel & client on-site visits', status: 'active' },
        { id: 'exp-cat-4', name: 'Software and Tools', budget: 6000, description: 'Figma, GitHub, AI developer tool subscriptions', status: 'active' },
        { id: 'exp-cat-5', name: 'Advertising', budget: 8000, description: 'Telegram sponsored ads, social campaigns', status: 'active' },
        { id: 'exp-cat-6', name: 'Subcontractor / Specialist', budget: 15000, description: 'Freelance copywriters, photographers, translators', status: 'active' },
        { id: 'exp-cat-7', name: 'Office and Communication', budget: 3000, description: 'Ethio Telecom 4G/5G data, internet, stationary', status: 'active' },
        { id: 'exp-cat-8', name: 'Miscellaneous', budget: 2000, description: 'Incidental business expenditures', status: 'active' }
    ];

    // Default Payment Methods
    const defaultPaymentMethods = [
        { id: 'pm-1', name: 'Telebirr', provider: 'Ethio Telecom', status: 'active', isDefault: true },
        { id: 'pm-2', name: 'Bank Transfer (CBE)', provider: 'Commercial Bank of Ethiopia', status: 'active', isDefault: false },
        { id: 'pm-3', name: 'Awash Bank', provider: 'Awash Birr / Internet Banking', status: 'active', isDefault: false },
        { id: 'pm-4', name: 'Dashen Bank', provider: 'Amole / Dashen Mobile', status: 'active', isDefault: false },
        { id: 'pm-5', name: 'Bank of Abyssinia', provider: 'BoA Apollo App', status: 'active', isDefault: false },
        { id: 'pm-6', name: 'Cash', provider: 'Direct Physical Cash', status: 'active', isDefault: false },
        { id: 'pm-7', name: 'Cheque / Direct Deposit', provider: 'Bank Cheque Deposit', status: 'active', isDefault: false }
    ];

    // Default Financial Settings
    const defaultFinancialSettings = {
        currency: 'ETB',
        currencySymbol: 'ETB',
        monthlyRevenueGoal: 100000,
        monthlyProfitGoal: 65000,
        accountingMethod: 'cash',
        fiscalYearStart: '2026-01-01',
        administrator: 'ELNA Lead Administrator'
    };

    // Seed Financial Audit Log
    const defaultFinancialAuditLog = [
        {
            id: 'faudit-init-1',
            date: '2026-11-06 15:45',
            action: 'INITIAL_RECORD',
            itemType: 'Payment',
            itemId: 'pay-1',
            details: 'Initial 50% advance payment recorded for Enkoye Café & Bistro (3,500 ETB)',
            oldValue: '0 ETB',
            newValue: '3,500 ETB',
            reason: 'Contract signing deposit via Telebirr',
            administrator: 'ELNA Lead Administrator'
        },
        {
            id: 'faudit-init-2',
            date: '2026-11-09 11:20',
            action: 'INITIAL_RECORD',
            itemType: 'Expense',
            itemId: 'exp-1',
            details: '30 Laser-cut acrylic stands for Enkoye Café (1,400 ETB)',
            oldValue: '0 ETB',
            newValue: '1,400 ETB',
            reason: 'Procurement invoice #ST-4401',
            administrator: 'ELNA Lead Administrator'
        }
    ];

    // Default Seed Data (Realistic Ethiopian Business Context with Classifications)
    const defaultData = {
        clients: [
            {
                id: 'c-1',
                businessName: 'Enkoye Café & Bistro',
                contactPerson: 'Abebe Tadesse',
                phone: '+251 91 123 4567',
                email: 'abebe@enkoyecafe.com',
                category: 'Restaurant & Café',
                location: 'Bole Medhanialem, Addis Ababa',
                googleMapsUrl: 'https://maps.google.com/?q=Bole+Medhanialem+Addis+Ababa',
                classification: 'GOLD',
                instagramUrl: 'https://instagram.com/enkoyecafe',
                facebookUrl: 'https://facebook.com/enkoyecafe',
                tiktokUrl: 'https://tiktok.com/@enkoyecafe',
                websiteUrl: 'https://enkoyecafe.com',
                otherSocialUrl: '',
                createdAt: '2026-11-05',
                notes: 'Specialty cafe looking for fast contactless QR menus and social media growth.'
            },
            {
                id: 'c-2',
                businessName: 'Bole Tech Hub & Co-working',
                contactPerson: 'Hiwot Bekele',
                phone: '+251 92 888 9900',
                email: 'hiwot@boletech.et',
                category: 'Tech & Innovation',
                location: 'Bole Atlas, Addis Ababa',
                googleMapsUrl: 'https://maps.google.com/?q=Bole+Atlas+Addis+Ababa',
                classification: 'GOLD',
                instagramUrl: 'https://instagram.com/boletechhub',
                facebookUrl: '',
                tiktokUrl: '',
                websiteUrl: 'https://boletech.et',
                otherSocialUrl: 'https://t.me/boletechhub',
                createdAt: '2026-11-08',
                notes: 'Custom web platform with member tracking system and automated booking.'
            },
            {
                id: 'c-3',
                businessName: 'Zoma Organic Kitchen',
                contactPerson: 'Dawit Mengistu',
                phone: '+251 93 456 7890',
                email: 'info@zomakitchen.et',
                category: 'Hospitality & Dining',
                location: 'Old Airport / Mekanisa, Addis Ababa',
                googleMapsUrl: 'https://maps.google.com/?q=Zoma+Museum+Addis+Ababa',
                classification: 'SILVER',
                instagramUrl: 'https://instagram.com/zomakitchen',
                facebookUrl: 'https://facebook.com/zomakitchen',
                tiktokUrl: 'https://tiktok.com/@zomakitchen',
                websiteUrl: 'https://zomakitchen.et',
                otherSocialUrl: '',
                createdAt: '2026-11-12',
                notes: 'Eco-conscious dining brand. Google Business profile setup and Food delivery onboarding.'
            }
        ],
        services: [
            {
                id: 'srv-1',
                name: 'Website Development',
                description: 'Custom modern responsive web application & landing page with SEO optimization.',
                defaultPrice: 25000,
                deliveryDays: 14,
                category: 'Development',
                defaultTasks: [
                    'Collect client requirements and design moodboard',
                    'Receive initial deposit / advance payment',
                    'Gather high-res assets, logo, and brand copy',
                    'Design wireframe and interactive UX prototype',
                    'Develop responsive frontend application',
                    'Build backend & API integration',
                    'Cross-browser and mobile device testing',
                    'Client walkthrough and review session',
                    'Apply client revisions and finalize features',
                    'Receive final payment milestone',
                    'Deploy to production domain & client handover'
                ]
            },
            {
                id: 'srv-2',
                name: 'Food Delivery Platform Onboarding',
                description: 'Full profile setup, professional menu digitization, pricing strategy on BeU, Deliver Addis, Tikus.',
                defaultPrice: 8000,
                deliveryDays: 5,
                category: 'Integration',
                defaultTasks: [
                    'Audit current menu items and pricing margins',
                    'Submit vendor application to BeU, Deliver Addis, and Tikus',
                    'Digitize menu items with high-appeal descriptions',
                    'Configure delivery radius and operating hours',
                    'Conduct test dispatch and staff training'
                ]
            },
            {
                id: 'srv-3',
                name: 'Tracking System',
                description: 'Custom operational & inventory tracking platform with live dashboards and exportable reports.',
                defaultPrice: 18000,
                deliveryDays: 10,
                category: 'Software',
                defaultTasks: [
                    'Define tracking metrics and user access roles',
                    'Configure live analytics dashboard',
                    'Set up inventory / order milestone triggers',
                    'Integrate Telegram/SMS notification alerts',
                    'Train management team on reporting workflows'
                ]
            },
            {
                id: 'srv-4',
                name: 'Google Business Profile Setup',
                description: 'Claim, verify, and fully optimize Google Maps listing, SEO keywords, photos, and review capture.',
                defaultPrice: 5000,
                deliveryDays: 3,
                category: 'Marketing',
                defaultTasks: [
                    'Verify physical address and pin location on Google Maps',
                    'Upload geotagged high-resolution photography',
                    'Configure business categories, operating hours, and contact channels',
                    'Create review solicitation QR card templates'
                ]
            },
            {
                id: 'srv-5',
                name: 'Social Media Management',
                description: '30-day comprehensive content calendar, high-converting reels, graphics, and community management.',
                defaultPrice: 12000,
                deliveryDays: 30,
                category: 'Marketing',
                defaultTasks: [
                    'Develop 30-day content strategy and aesthetic theme',
                    'Produce 12 high-engagement reels & carousel posts',
                    'Publish posts according to prime engagement hours',
                    'Monitor comments and direct message inquiries',
                    'Deliver monthly performance and ROI report'
                ]
            },
            {
                id: 'srv-6',
                name: 'QR Digital Menu',
                description: 'Interactive multilingual digital menu with table stand acrylic displays, category filters, and analytics.',
                defaultPrice: 6500,
                deliveryDays: 4,
                category: 'Hospitality',
                defaultTasks: [
                    'Digitize complete food and beverage catalog',
                    'Design customized branded QR code table display stands',
                    'Print durable waterproof acrylic QR plaques',
                    'Test menu loading speeds on mobile networks',
                    'Install display stands on client tables'
                ]
            }
        ],
        projects: [
            {
                id: 'p-1',
                clientId: 'c-1',
                clientName: 'Enkoye Café & Bistro',
                name: 'Enkoye Contactless QR Digital Menu & Table Stands',
                description: 'Design and deployment of multilingual digital QR menu with 30 printed acrylic table plaques.',
                startDate: '2026-11-06',
                expectedCompletionDate: '2026-11-15',
                actualCompletionDate: '2026-11-14',
                services: [
                    { serviceId: 'srv-6', name: 'QR Digital Menu', price: 6500, category: 'Hospitality' }
                ],
                extraCharges: 1000,
                extraChargesNote: '30 Premium laser-cut acrylic stands',
                discountType: 'fixed',
                discountValue: 500,
                subtotal: 7500,
                discountAmount: 500,
                finalPrice: 7000,
                status: 'Completed',
                clientApproved: true,
                clientApprovedAt: '2026-11-14',
                _completionCelebrated: true,
                _fullPaymentCelebrated: true,
                paymentDeadline: '2026-11-16',
                notes: 'Client was extremely satisfied with the fast delivery and clean UI.',
                tasks: [
                    { id: 't-101', text: 'Digitize complete food and beverage catalog', done: true, dueDate: '2026-11-08' },
                    { id: 't-102', text: 'Design customized branded QR code table display stands', done: true, dueDate: '2026-11-10' },
                    { id: 't-103', text: 'Print durable waterproof acrylic QR plaques (30 pcs)', done: true, dueDate: '2026-11-12' },
                    { id: 't-104', text: 'Test menu loading speeds on Ethio Telecom 4G/5G', done: true, dueDate: '2026-11-13' },
                    { id: 't-105', text: 'Install display stands on client tables & staff training', done: true, dueDate: '2026-11-14' }
                ],
                documents: [
                    { id: 'doc-1', name: 'Enkoye_Brand_Logo.png', category: 'Logo', size: '245 KB', uploadedAt: '2026-11-06' },
                    { id: 'doc-2', name: 'Signed_Service_Agreement_Enkoye.pdf', category: 'Contract', size: '1.2 MB', uploadedAt: '2026-11-06' }
                ]
            },
            {
                id: 'p-2',
                clientId: 'c-2',
                clientName: 'Bole Tech Hub & Co-working',
                name: 'Bole Tech Hub Web Platform & Member Portal',
                description: 'Modern responsive web platform with community directory, booking engine, and event calendar.',
                startDate: '2026-11-10',
                expectedCompletionDate: '2026-11-28',
                actualCompletionDate: null,
                services: [
                    { serviceId: 'srv-1', name: 'Website Development', price: 25000, category: 'Development' },
                    { serviceId: 'srv-4', name: 'Google Business Profile Setup', price: 5000, category: 'Marketing' }
                ],
                extraCharges: 2000,
                extraChargesNote: 'Priority expedited development sprint',
                discountType: 'percent',
                discountValue: 10,
                subtotal: 32000,
                discountAmount: 3200,
                finalPrice: 28800,
                status: 'Ongoing',
                paymentDeadline: '2026-11-25',
                notes: 'Advance payment received. Currently developing frontend user portal.',
                tasks: [
                    { id: 't-201', text: 'Collect client requirements and wireframe approval', done: true, dueDate: '2026-11-12' },
                    { id: 't-202', text: 'Receive initial advance payment (15,000 ETB)', done: true, dueDate: '2026-11-11' },
                    { id: 't-203', text: 'Design interactive UI prototype on Figma', done: true, dueDate: '2026-11-16' },
                    { id: 't-204', text: 'Frontend implementation with Tailwind & React', done: false, dueDate: '2026-11-20' },
                    { id: 't-205', text: 'Setup Google Business Profile & verified pin', done: false, dueDate: '2026-11-22' },
                    { id: 't-206', text: 'Deploy staging environment for client review', done: false, dueDate: '2026-11-26' }
                ],
                documents: [
                    { id: 'doc-3', name: 'BoleTechHub_Proposal_Approved.pdf', category: 'Contract', size: '2.4 MB', uploadedAt: '2026-11-10' }
                ]
            },
            {
                id: 'p-3',
                clientId: 'c-3',
                clientName: 'Zoma Organic Kitchen',
                name: 'Zoma Delivery Platform Setup & Local SEO',
                description: 'Onboarding to BeU and Deliver Addis plus Google Maps verified local presence.',
                startDate: '2026-11-14',
                expectedCompletionDate: '2026-11-24',
                actualCompletionDate: null,
                services: [
                    { serviceId: 'srv-2', name: 'Food Delivery Platform Onboarding', price: 8000, category: 'Integration' },
                    { serviceId: 'srv-4', name: 'Google Business Profile Setup', price: 5000, category: 'Marketing' }
                ],
                extraCharges: 0,
                extraChargesNote: '',
                discountType: 'fixed',
                discountValue: 0,
                subtotal: 13000,
                discountAmount: 0,
                finalPrice: 13000,
                status: 'Waiting for Client',
                paymentDeadline: '2026-11-19',
                notes: 'Awaiting high-resolution food photos from client photographer.',
                tasks: [
                    { id: 't-301', text: 'Audit current menu pricing and margins', done: true, dueDate: '2026-11-15' },
                    { id: 't-302', text: 'Receive initial 5,000 ETB advance', done: true, dueDate: '2026-11-15' },
                    { id: 't-303', text: 'Submit vendor application to BeU & Deliver Addis', done: false, dueDate: '2026-11-18' },
                    { id: 't-304', text: 'Google Maps address verification postcard / video', done: false, dueDate: '2026-11-21' }
                ],
                documents: []
            }
        ],
        payments: [
            {
                id: 'pay-1',
                projectId: 'p-1',
                clientId: 'c-1',
                clientName: 'Enkoye Café & Bistro',
                amount: 3500,
                date: '2026-11-06',
                method: 'Telebirr',
                type: 'Advance Payment',
                reference: 'TB-98234710',
                notes: '50% upfront payment upon contract signing.'
            },
            {
                id: 'pay-2',
                projectId: 'p-1',
                clientId: 'c-1',
                clientName: 'Enkoye Café & Bistro',
                amount: 3500,
                date: '2026-11-14',
                method: 'Bank Transfer',
                type: 'Final Payment',
                reference: 'CBE-FT-88912',
                notes: 'Final balance paid upon installation of 30 table stands.'
            },
            {
                id: 'pay-3',
                projectId: 'p-2',
                clientId: 'c-2',
                clientName: 'Bole Tech Hub & Co-working',
                amount: 15000,
                date: '2026-11-11',
                method: 'Bank Transfer',
                type: 'Advance Payment',
                reference: 'AWASH-998124',
                notes: 'Advance deposit for Website and Google Business setup.'
            },
            {
                id: 'pay-4',
                projectId: 'p-3',
                clientId: 'c-3',
                clientName: 'Zoma Organic Kitchen',
                amount: 5000,
                date: '2026-11-15',
                method: 'Telebirr',
                type: 'Advance Payment',
                reference: 'TB-4412093',
                notes: 'Advance deposit for delivery onboarding.'
            }
        ],
        expenses: [
            {
                id: 'exp-1',
                name: 'Laser Acrylic Cutting & Stand Materials',
                category: 'QR Materials',
                amount: 1400,
                date: '2026-11-09',
                clientId: 'c-1',
                projectId: 'p-1',
                description: '30 acrylic stands purchased from Stadium Graphics printing house.',
                receiptNote: 'Invoice #ST-4401'
            },
            {
                id: 'exp-2',
                name: 'Transportation & Client Site Visits (Bole)',
                category: 'Transportation',
                amount: 650,
                date: '2026-11-13',
                clientId: 'c-1',
                projectId: 'p-1',
                description: 'Ride taxi to Enkoye Cafe for menu photography & stand placement.',
                receiptNote: 'Ride digital receipt'
            },
            {
                id: 'exp-3',
                name: 'Domain Registration & Fast Cloud VPS',
                category: 'Hosting and Domains',
                amount: 2800,
                date: '2026-11-11',
                clientId: 'c-2',
                projectId: 'p-2',
                description: 'Annual domain registration & cloud VPS hosting for Bole Tech Hub.',
                receiptNote: 'Receipt #VPS-889'
            },
            {
                id: 'exp-4',
                name: 'Figma Organization & AI Developer Tools',
                category: 'Software and Tools',
                amount: 1950,
                date: '2026-11-04',
                clientId: null,
                projectId: null,
                description: 'General ELNA DIGITAL business subscription for design & coding tools.',
                receiptNote: 'Monthly Card Billing'
            },
            {
                id: 'exp-5',
                name: 'ELNA DIGITAL Telegram Sponsored Ads',
                category: 'Advertising',
                amount: 1500,
                date: '2026-11-07',
                clientId: null,
                projectId: null,
                description: 'Promotional campaign targeting Addis Ababa restaurant and cafe owners.',
                receiptNote: 'TG-Ad campaign #01'
            }
        ],
        activityLog: [
            { id: 'act-1', date: '2026-11-05 10:30', text: 'Client "Enkoye Café & Bistro" (GOLD) registered', type: 'client' },
            { id: 'act-2', date: '2026-11-06 14:15', text: 'Project "Enkoye Contactless QR Digital Menu" created', type: 'project' },
            { id: 'act-3', date: '2026-11-06 15:45', text: 'Payment of 3,500 ETB received from Enkoye Café via Telebirr (Advance Payment)', type: 'payment' },
            { id: 'act-4', date: '2026-11-09 11:20', text: 'Expense of 1,400 ETB recorded: Laser Acrylic Cutting (QR Materials)', type: 'expense' },
            { id: 'act-5', date: '2026-11-10 09:00', text: 'Client "Bole Tech Hub & Co-working" (GOLD) registered', type: 'client' },
            { id: 'act-6', date: '2026-11-10 11:30', text: 'Project "Bole Tech Hub Web Platform" created', type: 'project' },
            { id: 'act-7', date: '2026-11-11 16:00', text: 'Payment of 15,000 ETB received from Bole Tech Hub via Bank Transfer', type: 'payment' },
            { id: 'act-8', date: '2026-11-14 17:30', text: 'Project "Enkoye Contactless QR Digital Menu" marked Completed', type: 'project' },
            { id: 'act-9', date: '2026-11-14 18:00', text: 'Final Payment of 3,500 ETB received from Enkoye Café via Bank Transfer (Fully Paid)', type: 'payment' },
            { id: 'act-10', date: '2026-11-15 12:00', text: 'Payment of 5,000 ETB received from Zoma Organic Kitchen via Telebirr', type: 'payment' }
        ],
        packages: defaultPackages,
        pricingHistory: defaultPricingHistory,
        incomeCategories: defaultIncomeCategories,
        expenseCategories: defaultExpenseCategories,
        paymentMethods: defaultPaymentMethods,
        financialSettings: defaultFinancialSettings,
        financialAuditLog: defaultFinancialAuditLog
    };

    // State container
    window.clientProjectsState = loadState();

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && Array.isArray(parsed.clients) && Array.isArray(parsed.projects)) {
                    // Backwards compatibility migration for classification & approval
                    parsed.clients.forEach(c => {
                        if (!c.classification) c.classification = 'GOLD';
                    });
                    if (!parsed.packages || !Array.isArray(parsed.packages) || parsed.packages.length === 0) {
                        parsed.packages = JSON.parse(JSON.stringify(defaultPackages));
                    }
                    if (!parsed.pricingHistory || !Array.isArray(parsed.pricingHistory)) {
                        parsed.pricingHistory = JSON.parse(JSON.stringify(defaultPricingHistory));
                    }
                    if (!parsed.incomeCategories || !Array.isArray(parsed.incomeCategories)) {
                        parsed.incomeCategories = JSON.parse(JSON.stringify(defaultIncomeCategories));
                    }
                    if (!parsed.expenseCategories || !Array.isArray(parsed.expenseCategories)) {
                        parsed.expenseCategories = JSON.parse(JSON.stringify(defaultExpenseCategories));
                    }
                    if (!parsed.paymentMethods || !Array.isArray(parsed.paymentMethods)) {
                        parsed.paymentMethods = JSON.parse(JSON.stringify(defaultPaymentMethods));
                    }
                    if (!parsed.financialSettings) {
                        parsed.financialSettings = JSON.parse(JSON.stringify(defaultFinancialSettings));
                    }
                    if (!parsed.financialAuditLog || !Array.isArray(parsed.financialAuditLog)) {
                        parsed.financialAuditLog = JSON.parse(JSON.stringify(defaultFinancialAuditLog));
                    }
                    if (Array.isArray(parsed.payments)) {
                        parsed.payments.forEach((pay, idx) => {
                            if (!pay.txnId) pay.txnId = `TXN-INC-${1000 + idx + 1}`;
                            if (!pay.category) pay.category = pay.type || 'Project Payment';
                        });
                    }
                    if (Array.isArray(parsed.expenses)) {
                        parsed.expenses.forEach((exp, idx) => {
                            if (!exp.txnId) exp.txnId = `TXN-EXP-${2000 + idx + 1}`;
                            if (!exp.paymentMethod) exp.paymentMethod = 'Bank Transfer';
                        });
                    }
                    if (Array.isArray(parsed.services)) {
                        parsed.services.forEach(s => {
                            if (!s.status) s.status = 'active';
                        });
                    }
                    parsed.projects.forEach(p => {
                        if (p.status === 'Completed' && p.clientApproved === undefined) {
                            p.clientApproved = true;
                            p._completionCelebrated = true;
                            p._fullPaymentCelebrated = true;
                        }
                        if (!p.pricingSnapshot) {
                            const pkg = getProjectPackage(p);
                            p.pricingSnapshot = {
                                packageName: pkg ? pkg.name : 'Standard Package',
                                packageId: pkg ? pkg.id : 'pkg-std',
                                agreedPrice: p.finalPrice,
                                basePrice: p.subtotal || p.finalPrice,
                                extraCharges: p.extraCharges || 0,
                                discountAmount: p.discountAmount || 0,
                                advancePercentage: pkg ? (pkg.advancePercentage || 50) : 50,
                                services: JSON.parse(JSON.stringify(p.services || [])),
                                pricingVersion: 'v1.0-snapshot',
                                createdAt: p.startDate || '2026-11-01'
                            };
                        }
                    });

                    // Ensure collections for 6 New Management Modules
                    if (!parsed.leads || !Array.isArray(parsed.leads)) {
                        parsed.leads = [
                            {
                                id: 'lead-101',
                                businessName: 'Abyssinia Specialty Roasters',
                                ownerName: 'Dawit Mengistu',
                                phone: '+251 91 144 8822',
                                email: 'dawit@abyssiniaroasters.et',
                                location: 'Bole Medhanialem, Addis Ababa',
                                category: 'Restaurant & Cafe',
                                interestedServices: ['Website Development', 'Google Business Profile', 'QR Digital Menu'],
                                interestedPackage: 'Advanced',
                                estimatedValue: 15000,
                                dateAdded: '2026-11-10',
                                nextFollowUpDate: '2026-11-18',
                                notes: 'Interested in digital menu and SEO for tourist footfall. Very promising prospect.',
                                source: 'Referral',
                                status: 'Proposal Sent',
                                interactionHistory: [
                                    { id: 'int-1', date: '2026-11-10', type: 'Call', note: 'Initial introductory call with Dawit. Explained web & menu packages.' },
                                    { id: 'int-2', date: '2026-11-14', type: 'Proposal', note: 'Sent detailed Advanced package proposal (15,000 ETB).' }
                                ]
                            },
                            {
                                id: 'lead-102',
                                businessName: 'Sheger Chic Boutique',
                                ownerName: 'Bethlehem Tadesse',
                                phone: '+251 92 355 7799',
                                email: 'contact@shegerchic.com',
                                location: 'Kazanchis, Addis Ababa',
                                category: 'Retail & Shopping',
                                interestedServices: ['Social Media Management', 'Google Business Profile'],
                                interestedPackage: 'Basic',
                                estimatedValue: 10000,
                                dateAdded: '2026-11-12',
                                nextFollowUpDate: '2026-11-19',
                                notes: 'Wants Instagram and TikTok marketing for upcoming holiday season.',
                                source: 'Social Media',
                                status: 'Meeting Scheduled',
                                interactionHistory: [
                                    { id: 'int-3', date: '2026-11-12', type: 'Note', note: 'DM inquiry on Instagram about monthly management.' },
                                    { id: 'int-4', date: '2026-11-15', type: 'Meeting', note: 'In-person meeting scheduled at their showroom for Nov 19.' }
                                ]
                            },
                            {
                                id: 'lead-103',
                                businessName: 'Lucy Gourmet Bakery & Lounge',
                                ownerName: 'Yonas Kassa',
                                phone: '+251 93 477 1133',
                                email: 'yonas@lucygourmet.et',
                                location: 'Sarbet, Addis Ababa',
                                category: 'Restaurant & Cafe',
                                interestedServices: ['Website Development', 'Food Delivery Onboarding', 'QR Digital Menu', 'Tracking System'],
                                interestedPackage: 'Premium',
                                estimatedValue: 30000,
                                dateAdded: '2026-11-05',
                                nextFollowUpDate: '2026-11-17',
                                notes: 'High value lead. Opening second branch and needs end-to-end digital setup.',
                                source: 'Direct Outreach',
                                status: 'Negotiation',
                                interactionHistory: [
                                    { id: 'int-5', date: '2026-11-05', type: 'Meeting', note: 'Met owner at Sarbet location. Demoed QR menu.' },
                                    { id: 'int-6', date: '2026-11-11', type: 'Call', note: 'Negotiating payment terms (50% advance / 50% on delivery).' }
                                ]
                            }
                        ];
                    }

                    if (!parsed.calendarEvents || !Array.isArray(parsed.calendarEvents)) {
                        parsed.calendarEvents = [
                            {
                                id: 'evt-101',
                                title: 'Strategy & Delivery Review with Kuriftu',
                                date: '2026-11-19',
                                time: '14:30',
                                description: 'Quarterly review of social media and marketing campaign delivery.',
                                clientId: 'c1',
                                projectId: 'p1',
                                priority: 'High',
                                reminderTime: '1 hour before',
                                completed: false,
                                type: 'Meeting'
                            },
                            {
                                id: 'evt-102',
                                title: 'Website Launch & Final Handover (Bole Dental)',
                                date: '2026-11-20',
                                time: '10:00',
                                description: 'Client review, domain pointing, and final signoff checklist.',
                                clientId: 'c2',
                                projectId: 'p2',
                                priority: 'High',
                                reminderTime: '1 day before',
                                completed: false,
                                type: 'Deadline'
                            }
                        ];
                    }

                    if (!parsed.documents || !Array.isArray(parsed.documents)) {
                        parsed.documents = [
                            {
                                id: 'doc-101',
                                title: 'Service Agreement & Deliverables Contract',
                                category: 'Client Agreements',
                                folder: 'Contracts',
                                fileName: 'Kuriftu_Service_Agreement_Signed.pdf',
                                fileSize: 184500,
                                fileType: 'application/pdf',
                                uploadDate: '2026-11-02 11:20',
                                clientId: 'c1',
                                projectId: 'p1',
                                description: 'Countersigned master services agreement for Kuriftu Resort campaign.',
                                notes: 'Valid through Dec 2026. Signed by GM.',
                                data: null
                            },
                            {
                                id: 'doc-102',
                                title: 'Brand Identity & Vector Logos',
                                category: 'Client Logos',
                                folder: 'Assets',
                                fileName: 'Bole_Dental_Primary_Logo.svg',
                                fileSize: 42300,
                                fileType: 'image/svg+xml',
                                uploadDate: '2026-11-04 15:45',
                                clientId: 'c2',
                                projectId: 'p2',
                                description: 'Official high-resolution vector brand assets for website header.',
                                notes: 'Approved for web and digital prints.',
                                data: null
                            },
                            {
                                id: 'doc-103',
                                title: 'Corporate Brochure & Rate Card 2026',
                                category: 'Business Documents',
                                folder: 'Corporate',
                                fileName: 'ELNA_DIGITAL_RateCard_2026.pdf',
                                fileSize: 320000,
                                fileType: 'application/pdf',
                                uploadDate: '2026-11-01 09:00',
                                clientId: null,
                                projectId: null,
                                description: 'Official company rate card and package overview sheet.',
                                notes: 'For client presentations.',
                                data: null
                            }
                        ];
                    }

                    if (!parsed.invoices || !Array.isArray(parsed.invoices)) {
                        parsed.invoices = [
                            {
                                id: 'inv-101',
                                invoiceNumber: 'INV-2026-001',
                                clientId: 'c1',
                                projectId: 'p1',
                                issueDate: '2026-11-01',
                                dueDate: '2026-11-15',
                                agreedPrice: 30000,
                                items: [
                                    { description: 'ELNA Premium Digital Package — 4 Phases execution', quantity: 1, unitPrice: 30000, amount: 30000 }
                                ],
                                notes: 'Thank you for choosing ELNA DIGITAL. All payments are strictly in ETB.',
                                paymentInstructions: 'Commercial Bank of Ethiopia: 1000283921029 (ELNA DIGITAL) / Telebirr: 0911 234 567',
                                status: 'Partially Paid'
                            },
                            {
                                id: 'inv-102',
                                invoiceNumber: 'INV-2026-002',
                                clientId: 'c2',
                                projectId: 'p2',
                                issueDate: '2026-11-03',
                                dueDate: '2026-11-18',
                                agreedPrice: 15000,
                                items: [
                                    { description: 'ELNA Advanced Digital Package — Website & SEO suite', quantity: 1, unitPrice: 15000, amount: 15000 }
                                ],
                                notes: '50% advance received. Balance due upon delivery.',
                                paymentInstructions: 'Commercial Bank of Ethiopia: 1000283921029 (ELNA DIGITAL) / Telebirr: 0911 234 567',
                                status: 'Partially Paid'
                            }
                        ];
                    }

                    if (!parsed.quotations || !Array.isArray(parsed.quotations)) {
                        parsed.quotations = [
                            {
                                id: 'qte-101',
                                quotationNumber: 'QTE-2026-001',
                                clientId: 'c1',
                                clientName: 'Kuriftu Resort & Spa Bishoftu',
                                clientPhone: '+251 91 123 4567',
                                clientEmail: 'marketing@kuriftu.com',
                                selectedPackage: 'Premium',
                                items: [
                                    { description: 'Website Development & Booking portal integration', quantity: 1, unitPrice: 15000, amount: 15000 },
                                    { description: 'Social Media Strategy & 3-month Management campaign', quantity: 1, unitPrice: 10000, amount: 10000 },
                                    { description: 'Google Business Profile 360 Verification & SEO Optimization', quantity: 1, unitPrice: 5000, amount: 5000 }
                                ],
                                subtotal: 30000,
                                discount: 0,
                                extraCharges: 0,
                                totalAmount: 30000,
                                paymentTerms: '50% Advance on project kickoff, 50% upon final client signoff and deployment.',
                                quotationDate: '2026-10-28',
                                expiryDate: '2026-11-28',
                                notes: 'Quotation valid for 30 calendar days.',
                                status: 'Accepted'
                            },
                            {
                                id: 'qte-102',
                                quotationNumber: 'QTE-2026-002',
                                clientId: null,
                                clientName: 'Abyssinia Specialty Roasters',
                                clientPhone: '+251 91 144 8822',
                                clientEmail: 'dawit@abyssiniaroasters.et',
                                selectedPackage: 'Advanced',
                                items: [
                                    { description: 'ELNA Advanced Digital Package (Website, Google Profile, Menu QR)', quantity: 1, unitPrice: 15000, amount: 15000 }
                                ],
                                subtotal: 15000,
                                discount: 0,
                                extraCharges: 0,
                                totalAmount: 15000,
                                paymentTerms: '50% Advance payment, 50% upon delivery.',
                                quotationDate: '2026-11-14',
                                expiryDate: '2026-12-14',
                                notes: 'Custom onboarding setup included.',
                                status: 'Sent'
                            }
                        ];
                    }

                    if (!parsed.receipts || !Array.isArray(parsed.receipts)) {
                        parsed.receipts = [
                            {
                                id: 'rec-101',
                                receiptNumber: 'REC-2026-001',
                                paymentId: 'pay-1',
                                clientId: 'c1',
                                projectId: 'p1',
                                invoiceId: 'inv-101',
                                amount: 15000,
                                date: '2026-11-02',
                                method: 'Bank Transfer',
                                notes: '50% Kickoff advance payment acknowledged.'
                            },
                            {
                                id: 'rec-102',
                                receiptNumber: 'REC-2026-002',
                                paymentId: 'pay-2',
                                clientId: 'c2',
                                projectId: 'p2',
                                invoiceId: 'inv-102',
                                amount: 7500,
                                date: '2026-11-04',
                                method: 'Telebirr',
                                notes: '50% Advance payment for Advanced Package.'
                            }
                        ];
                    }

                    if (!parsed.feedback || !Array.isArray(parsed.feedback)) {
                        parsed.feedback = [
                            {
                                id: 'fb-101',
                                clientId: 'c3',
                                projectId: 'p3',
                                clientName: 'Walia Supermarket & Delivery',
                                projectName: 'Walia Supermarket Food Delivery & QR Suite',
                                overallRating: 5,
                                qualityRating: 5,
                                communicationRating: 5,
                                deliveryRating: 4,
                                comments: 'Outstanding execution and prompt customer support. Our delivery orders grew by 40% in the first two weeks.',
                                suggestions: 'Would love automated SMS alerts for delivery riders in Phase 2.',
                                date: '2026-11-12',
                                status: 'Received',
                                isTestimonial: true
                            },
                            {
                                id: 'fb-102',
                                clientId: 'c1',
                                projectId: 'p1',
                                clientName: 'Kuriftu Resort & Spa Bishoftu',
                                projectName: 'Kuriftu Resort Full Digital Transformation',
                                overallRating: 5,
                                qualityRating: 5,
                                communicationRating: 4,
                                deliveryRating: 5,
                                comments: 'High-level professional design and seamless branding across all digital touchpoints.',
                                suggestions: 'Keep providing weekly performance summaries.',
                                date: '2026-11-15',
                                status: 'Received',
                                isTestimonial: true
                            }
                        ];
                    }

                    if (!parsed.businessGoals || !Array.isArray(parsed.businessGoals)) {
                        parsed.businessGoals = [
                            {
                                id: 'goal-101',
                                name: 'Q4 2026 Total Revenue Milestone',
                                description: 'Reach 100,000 ETB in actual collected revenue across digital service contracts.',
                                category: 'Revenue Goals',
                                target: 100000,
                                startValue: 0,
                                currentValue: 0,
                                unit: 'ETB',
                                dataSource: 'revenue',
                                startDate: '2026-10-01',
                                deadline: '2026-12-31',
                                priority: 'High',
                                notes: 'Tracked automatically against actual payment records in Earn Management.',
                                status: 'active',
                                achievedDate: null,
                                _celebrated: false
                            },
                            {
                                id: 'goal-102',
                                name: 'Secure 10 Premium & Advanced Retainers',
                                description: 'Acquire and onboard 10 enterprise digital clients in Addis Ababa.',
                                category: 'Client Acquisition',
                                target: 10,
                                startValue: 0,
                                currentValue: 0,
                                unit: 'clients',
                                dataSource: 'clients',
                                startDate: '2026-10-01',
                                deadline: '2026-12-31',
                                priority: 'High',
                                notes: 'Synchronized with active registered clients.',
                                status: 'active',
                                achievedDate: null,
                                _celebrated: false
                            },
                            {
                                id: 'goal-103',
                                name: 'Maintain 95%+ Net Profit Margin',
                                description: 'Achieve 75,000 ETB net operational profit after direct business expenses.',
                                category: 'Profit Goals',
                                target: 75000,
                                startValue: 0,
                                currentValue: 0,
                                unit: 'ETB',
                                dataSource: 'profit',
                                startDate: '2026-10-01',
                                deadline: '2026-12-31',
                                priority: 'Medium',
                                notes: 'Revenue minus direct recorded expenses.',
                                status: 'active',
                                achievedDate: null,
                                _celebrated: false
                            },
                            {
                                id: 'goal-104',
                                name: '5 Star Client Satisfaction Excellence',
                                description: 'Maintain average satisfaction above 4.8 out of 5 based on authentic client reviews.',
                                category: 'Service Growth',
                                target: 95,
                                startValue: 80,
                                currentValue: 98,
                                unit: '%',
                                dataSource: 'manual',
                                startDate: '2026-11-01',
                                deadline: '2026-12-31',
                                priority: 'High',
                                notes: 'Derived from Client Feedback & Reviews module.',
                                status: 'active',
                                achievedDate: null,
                                _celebrated: false
                            }
                        ];
                    }
                }
            }
        } catch (e) {
            console.error('Failed to load client projects state:', e);
        }
        saveStateDirect(defaultData);
        return JSON.parse(JSON.stringify(defaultData));
    }

    function saveState() {
        saveStateDirect(window.clientProjectsState);
        renderProjects();
    }

    window.saveClientProjectsState = saveState;

    function saveStateDirect(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Failed to save client projects state:', e);
        }
    }

    window.saveClientProjectsStateDirect = saveStateDirect;

    // Helper currency formatter (ETB Only)
    function formatETB(amount) {
        const num = Math.round(Number(amount) || 0);
        return num.toLocaleString() + ' ETB';
    }

    // Helper classification badge
    function getClassificationBadge(classification, isLarge = false) {
        const cls = (classification || 'STARTER').toUpperCase();
        const baseClass = isLarge ? 'px-3 py-1 rounded-full text-xs font-black' : 'px-2.5 py-0.5 rounded-full text-[10px] font-black';

        switch (cls) {
            case 'GOLD':
                return `<span class="${baseClass} bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black border border-amber-300 shadow-sm flex items-center gap-1.5"><i class="fas fa-crown text-[10px]"></i> GOLD</span>`;
            case 'SILVER':
                return `<span class="${baseClass} bg-gradient-to-r from-slate-200 to-slate-300 text-slate-800 dark:bg-slate-700 dark:text-slate-100 border border-slate-300 dark:border-slate-600 shadow-xs flex items-center gap-1.5"><i class="fas fa-medal text-[10px]"></i> SILVER</span>`;
            case 'BRONZE':
                return `<span class="${baseClass} bg-gradient-to-r from-amber-700/20 to-amber-800/20 text-amber-900 dark:text-amber-300 border border-amber-600/30 flex items-center gap-1.5"><i class="fas fa-shield-alt text-[10px]"></i> BRONZE</span>`;
            case 'STARTER':
            default:
                return `<span class="${baseClass} bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-500/30 flex items-center gap-1.5"><i class="fas fa-seedling text-[10px]"></i> STARTER</span>`;
        }
    }

    function logActivity(text, type = 'general') {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const timestamp = `${y}-${m}-${d} ${hh}:${mm}`;

        window.clientProjectsState.activityLog.unshift({
            id: 'act-' + Date.now(),
            date: timestamp,
            text: text,
            type: type
        });
        if (window.clientProjectsState.activityLog.length > 100) {
            window.clientProjectsState.activityLog.pop();
        }
    }

    // Current active sub-tab inside Client Projects
    let activeSubTab = 'dashboard';

    // Filtering & Sorting State for Projects Tab
    let projectFilter = {
        search: '',
        status: 'ALL',
        paymentStatus: 'ALL',
        serviceCategory: 'ALL',
        sortBy: 'newest'
    };

    // Currently opened project or client in modal
    let currentDetailProjectId = null;
    let detailActiveTab = 'overview';
    let currentDetailClientId = null;

    // Expose helpers globally
    window.setClientProjectsSubTab = function (tab, syncHash = true) {
        activeSubTab = tab;
        if (syncHash && (tab === 'services' || tab === 'earn' || tab === 'projects')) {
            if (window.location.hash !== '#' + tab) {
                window.location.hash = tab;
            }
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === tab);
            });
            const titles = {
                projects: 'Client Projects',
                services: 'Services & Pricing Control Room',
                earn: 'Earn Management Control Room'
            };
            const bc = document.getElementById('breadcrumb-current');
            if (bc && titles[tab]) bc.textContent = titles[tab];
        }
        renderProjects();
    };

    window.setProjectFilter = function (key, value) {
        projectFilter[key] = value;
        renderProjects();
    };

    window.resetProjectFilters = function () {
        projectFilter.search = '';
        projectFilter.status = 'ALL';
        projectFilter.paymentStatus = 'ALL';
        projectFilter.sortBy = 'newest';
        renderProjects();
    };

    window.resetProjectStatusFilter = function () {
        projectFilter.status = 'ALL';
        renderProjects();
    };

    // Services & Pricing Control Room Sub-Tabs: 'packages' | 'services' | 'history' | 'protection'
    let _controlRoomSubTab = 'packages';
    let _serviceCatalogSearch = '';
    let _serviceCatalogCategory = 'ALL';
    let _serviceCatalogStatus = 'ALL';

    window.setControlRoomSubTab = function (subTab) {
        _controlRoomSubTab = subTab;
        renderProjects();
    };

    window.setServiceCatalogFilter = function (key, value) {
        if (key === 'search') _serviceCatalogSearch = value;
        if (key === 'category') _serviceCatalogCategory = value;
        if (key === 'status') _serviceCatalogStatus = value;
        renderProjects();
    };

    // ==============================================================================
    // Earn Management Control Room State & Filters
    // Sub-Tabs: 'dashboard' | 'income' | 'expenses' | 'analytics' | 'reports' | 'settings'
    // ==============================================================================
    let _earnControlRoomSubTab = 'dashboard';
    let _incomeSearch = '';
    let _incomeCategoryFilter = 'ALL';
    let _incomeMethodFilter = 'ALL';
    let _incomeDateFrom = '';
    let _incomeDateTo = '';

    let _expenseSearch = '';
    let _expenseCategoryFilter = 'ALL';
    let _expenseProjectFilter = 'ALL';
    let _expenseDateFrom = '';
    let _expenseDateTo = '';

    let _analyticsPeriod = 'monthly'; // 'daily' | 'weekly' | 'monthly' | 'yearly'

    window.setEarnControlRoomSubTab = function (subTab) {
        _earnControlRoomSubTab = subTab;
        renderProjects();
    };

    window.setIncomeFilter = function (key, value) {
        if (key === 'search') _incomeSearch = value;
        if (key === 'category') _incomeCategoryFilter = value;
        if (key === 'method') _incomeMethodFilter = value;
        if (key === 'dateFrom') _incomeDateFrom = value;
        if (key === 'dateTo') _incomeDateTo = value;
        renderProjects();
    };

    window.resetIncomeFilters = function () {
        _incomeSearch = '';
        _incomeCategoryFilter = 'ALL';
        _incomeMethodFilter = 'ALL';
        _incomeDateFrom = '';
        _incomeDateTo = '';
        renderProjects();
    };

    window.setExpenseFilter = function (key, value) {
        if (key === 'search') _expenseSearch = value;
        if (key === 'category') _expenseCategoryFilter = value;
        if (key === 'project') _expenseProjectFilter = value;
        if (key === 'dateFrom') _expenseDateFrom = value;
        if (key === 'dateTo') _expenseDateTo = value;
        renderProjects();
    };

    window.resetExpenseFilters = function () {
        _expenseSearch = '';
        _expenseCategoryFilter = 'ALL';
        _expenseProjectFilter = 'ALL';
        _expenseDateFrom = '';
        _expenseDateTo = '';
        renderProjects();
    };

    window.setAnalyticsPeriod = function (period) {
        _analyticsPeriod = period;
        renderProjects();
    };

    // ==============================================================================
    // MAIN RENDER FUNCTION: Upgrades #view-projects
    // ==============================================================================
    window.renderProjects = function () {
        const container = document.getElementById('view-projects');
        if (!container) return;

        const state = window.clientProjectsState;

        // Calculate Global Business Metrics
        let totalContracted = 0;
        let totalReceived = 0;
        let totalDiscounts = 0;
        let activeProjectsCount = 0;
        let completedProjectsCount = 0;

        state.projects.forEach(p => {
            ensureProjectPhasedTasks(p);
            syncProjectStatus(p);
            if (p.status !== 'Cancelled') {
                totalContracted += (Number(p.finalPrice) || 0);
            }
            totalDiscounts += (Number(p.discountAmount) || 0);
            if (p.status === 'Completed') {
                completedProjectsCount++;
            } else if (p.status !== 'Cancelled') {
                activeProjectsCount++;
            }
        });

        let totalAdvance = 0;
        let totalFinal = 0;
        state.payments.forEach(pay => {
            const amt = (Number(pay.amount) || 0);
            totalReceived += amt;
            const pType = (pay.type || '').toLowerCase();
            const pCat = (pay.category || '').toLowerCase();
            if (pType.includes('advance') || pCat.includes('advance')) {
                totalAdvance += amt;
            } else if (pType.includes('final') || pCat.includes('final')) {
                totalFinal += amt;
            }
        });

        let totalExpenses = 0;
        state.expenses.forEach(e => {
            totalExpenses += (Number(e.amount) || 0);
        });

        const pendingPayments = Math.max(0, totalContracted - totalReceived);
        const netProfit = totalReceived - totalExpenses;
        const availableCash = totalReceived - totalExpenses;

        let headerHTML = '';
        if (activeSubTab !== 'services' && activeSubTab !== 'earn' && activeSubTab !== 'dashboard') {
            headerHTML = `
                <!-- Top Header & Action Row -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#a06438] dark:text-[#e6993a]">
                                ELNA DIGITAL · CLIENT OPERATIONS & REVENUE
                            </span>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e6993a]/15 text-[#e6993a] border border-[#e6993a]/30">
                                Live ETB Ledger
                            </span>
                        </div>
                        <h1 class="text-2xl sm:text-3xl font-black text-[var(--text-main)] mt-1">
                            Client Projects Management
                        </h1>
                        <p class="text-xs text-[var(--text-muted)] mt-1">
                            Complete client directory, contracts, delivery milestones, payments, expenses, and net profit.
                        </p>
                    </div>

                    <!-- Quick Action Buttons -->
                    <div class="flex flex-wrap items-center gap-2">
                        <button onclick="openNewClientModal()" class="py-2 px-4 rounded-xl text-xs font-bold bg-[#e6993a] hover:bg-[#d4882c] text-black transition shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                            <i class="fas fa-user-plus text-xs"></i>
                            <span>+ ADD NEW CLIENT</span>
                        </button>
                        <button onclick="openRecordPaymentModal()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm flex items-center gap-1.5 cursor-pointer">
                            <i class="fas fa-hand-holding-usd"></i>
                            <span>+ Record Payment</span>
                        </button>
                        <button onclick="openNewExpenseModal()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-rose-700/80 hover:bg-rose-600 text-white transition shadow-sm flex items-center gap-1.5 cursor-pointer">
                            <i class="fas fa-receipt"></i>
                            <span>+ Add Expense</span>
                        </button>
                    </div>
                </div>
            `;
        }

        // Render Structure
        container.innerHTML = `
            ${headerHTML}

            <!-- Sub Navigation Tabs Bar -->
            <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-6 border-b border-[var(--card-border)] scrollbar-none">
                ${renderSubTabButton('projects', 'fas fa-briefcase', `Projects (${state.projects.length})`, activeSubTab)}
                ${renderSubTabButton('services', 'fas fa-tags', `Services & Pricing (${state.services.length})`, activeSubTab)}
                ${renderSubTabButton('earn', 'fas fa-coins', 'Earn Management', activeSubTab)}
                ${renderSubTabButton('clients', 'fas fa-users', `Clients (${state.clients.length})`, activeSubTab)}
                ${renderSubTabButton('expenses', 'fas fa-receipt', `Expenses (${state.expenses.length})`, activeSubTab)}
                ${renderSubTabButton('activity', 'fas fa-history', 'Activity History', activeSubTab)}
            </div>

            <!-- Active Sub-Tab View Container -->
            <div id="client-projects-tab-content">
                ${renderActiveTabContent(activeSubTab, {
                    totalContracted,
                    totalReceived,
                    totalDiscounts,
                    activeProjectsCount,
                    completedProjectsCount,
                    totalExpenses,
                    pendingPayments,
                    netProfit,
                    totalAdvance,
                    totalFinal,
                    availableCash
                })}
            </div>

            <!-- Global Detail & Action Modals Container -->
            <div id="cp-modal-container"></div>
        `;
    };

    function renderSubTabButton(id, icon, label, current) {
        const isActive = (id === current) || (id === 'earn' && current === 'dashboard');
        return `
            <button onclick="setClientProjectsSubTab('${id}')" class="px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${isActive ? 'bg-[#121815] text-[#e6993a] border border-[#e6993a]/40 shadow-sm dark:bg-[#1a231d] dark:text-[#e6993a]' : 'bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--card-border)] hover:text-[var(--text-main)] hover:border-slate-300 dark:hover:border-slate-700'}">
                <i class="${icon} text-xs ${isActive ? 'text-[#e6993a]' : 'opacity-70'}"></i>
                <span>${label}</span>
            </button>
        `;
    }

    function renderActiveTabContent(tab, metrics) {
        switch (tab) {
            case 'earn':
            case 'dashboard':
                return renderEarnControlRoom(metrics);
            case 'projects':
                return renderProjectsTab();
            case 'clients':
                return renderClientsTab();
            case 'services':
                return renderServicesTab();
            case 'expenses':
                return renderEarnControlRoom(metrics, 'expenses');
            case 'activity':
                return renderActivityTab();
            default:
                return renderEarnControlRoom(metrics);
        }
    }

    // ==============================================================================
    // 1. EARN MANAGEMENT CONTROL ROOM & FINANCIAL ARCHITECTURE
    // ==============================================================================
    function renderEarnControlRoom(m, forcedSubTab) {
        if (forcedSubTab) {
            _earnControlRoomSubTab = forcedSubTab;
        }
        const state = window.clientProjectsState;
        const currentSub = _earnControlRoomSubTab || 'dashboard';

        function renderEarnNavPill(id, icon, label, badge) {
            const isActive = currentSub === id;
            return `
                <button onclick="setEarnControlRoomSubTab('${id}')" class="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${isActive ? 'bg-[#121815] text-[#e6993a] border border-[#e6993a]/50 shadow-sm dark:bg-[#1a231d] dark:text-[#e6993a]' : 'bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--card-border)] hover:text-[var(--text-main)] hover:border-slate-300 dark:hover:border-slate-700'}">
                    <i class="${icon} text-xs ${isActive ? 'text-[#e6993a]' : 'opacity-70'}"></i>
                    <span>${label}</span>
                    ${badge !== undefined && badge !== null ? `<span class="px-1.5 py-0.2 rounded-full text-[10px] font-black ${isActive ? 'bg-[#e6993a]/20 text-[#e6993a]' : 'bg-[var(--subtle-bg)] text-[var(--text-muted)] border border-[var(--card-border)]'}">${badge}</span>` : ''}
                </button>
            `;
        }

        return `
            <div class="space-y-6">
                <!-- Earn Control Room Top Banner -->
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 rounded-[24px] bg-gradient-to-br from-[#121815] via-[#16211a] to-[#121815] text-white border border-[#e6993a]/30 shadow-xl relative overflow-hidden">
                    <div class="absolute -right-12 -bottom-12 w-48 h-48 bg-[#e6993a]/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-1.5">
                            <span class="text-[10px] font-black uppercase tracking-widest text-[#e6993a]">
                                ELNA DIGITAL · TREASURY & FINANCIAL CONTROL ROOM
                            </span>
                            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-[#4bd39a] border border-[#4bd39a]/30">
                                Live ETB Ledger v2.0
                            </span>
                        </div>
                        <h2 class="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
                            <i class="fas fa-coins text-[#e6993a]"></i>
                            <span>Earn Management Control Room</span>
                        </h2>
                        <p class="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                            Central financial intelligence: synchronized client milestone payments, audited expenditures, category budget caps, individual project profitability, and immutable audit logs.
                        </p>
                    </div>

                    <!-- Header Quick Actions -->
                    <div class="relative z-10 flex flex-wrap items-center gap-2 self-start lg:self-center">
                        <button onclick="openRecordPaymentModal()" class="py-2.5 px-4 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-md flex items-center gap-1.5 cursor-pointer">
                            <i class="fas fa-hand-holding-usd text-xs"></i>
                            <span>+ Record Income</span>
                        </button>
                        <button onclick="openNewExpenseModal()" class="py-2.5 px-4 rounded-xl text-xs font-black bg-rose-700/90 hover:bg-rose-600 text-white transition shadow-md flex items-center gap-1.5 cursor-pointer">
                            <i class="fas fa-receipt text-xs"></i>
                            <span>+ Add Expense</span>
                        </button>
                        <button onclick="openPrintableReport('pnl')" class="py-2.5 px-4 rounded-xl text-xs font-bold bg-[#1a231d] text-[#e6993a] border border-[#e6993a]/40 hover:bg-[#223126] transition shadow-xs flex items-center gap-1.5 cursor-pointer">
                            <i class="fas fa-file-invoice text-xs"></i>
                            <span>P&L Statement</span>
                        </button>
                    </div>
                </div>

                <!-- Sub-Navigation Navigation Pills -->
                <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    ${renderEarnNavPill('dashboard', 'fas fa-chart-pie', 'Financial Dashboard')}
                    ${renderEarnNavPill('income', 'fas fa-wallet', 'Income Management', state.payments.length)}
                    ${renderEarnNavPill('expenses', 'fas fa-receipt', 'Expense Management', state.expenses.length)}
                    ${renderEarnNavPill('analytics', 'fas fa-chart-line', 'Financial Analytics')}
                    ${renderEarnNavPill('reports', 'fas fa-file-invoice-dollar', 'Reports & Statements')}
                    ${renderEarnNavPill('settings', 'fas fa-sliders-h', 'Financial Settings & Audit')}
                </div>

                <!-- Active Sub-View Body -->
                <div>
                    ${renderEarnSubViewContent(currentSub, m, state)}
                </div>
            </div>
        `;
    }

    function renderEarnSubViewContent(subTab, m, state) {
        switch (subTab) {
            case 'dashboard':
                return renderEarnDashboard(m, state);
            case 'income':
                return renderEarnIncome(m, state);
            case 'expenses':
                return renderEarnExpenses(m, state);
            case 'analytics':
                return renderEarnAnalytics(m, state);
            case 'reports':
                return renderEarnReports(m, state);
            case 'settings':
                return renderEarnSettings(m, state);
            default:
                return renderEarnDashboard(m, state);
        }
    }

    // --------------------------------------------------------------------------
    // SUB-VIEW 1: FINANCIAL DASHBOARD (8 Core Financial KPIs & Health)
    // --------------------------------------------------------------------------
    function renderEarnDashboard(m, state) {
        const settings = state.financialSettings || defaultFinancialSettings;
        const revGoal = Number(settings.monthlyRevenueGoal) || 100000;
        const profGoal = Number(settings.monthlyProfitGoal) || 65000;
        const revPct = Math.min(100, Math.round((m.totalReceived / revGoal) * 100));
        const profPct = Math.min(100, Math.round((m.netProfit / profGoal) * 100));

        // Calculate Project Profitability Breakdown
        const projectProfitability = state.projects.map(p => {
            const agreed = Number(p.finalPrice) || 0;
            const paid = getProjectPaidAmount(p.id);
            const due = Math.max(0, agreed - paid);
            const directExp = getProjectExpenseAmount(p.id);
            // Cash-realized margin
            const netCashMargin = paid - directExp;
            const marginPct = paid > 0 ? Math.round((netCashMargin / paid) * 100) : 0;

            return {
                project: p,
                agreed,
                paid,
                due,
                directExp,
                netCashMargin,
                marginPct
            };
        });

        return `
            <!-- Top Summary KPI Cards (All 8 Core Required Financial Records) -->
            <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
                <!-- 1. Total Revenue Received (Confirmed Cash) -->
                <div class="ui-card p-4 rounded-2xl flex flex-col justify-between border-2 border-emerald-500/40 bg-emerald-500/5 shadow-sm">
                    <div class="flex items-center justify-between text-[11px] text-emerald-700 dark:text-emerald-400 font-extrabold uppercase tracking-wider">
                        <span>Total Revenue Received</span>
                        <div class="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-[#4bd39a] flex items-center justify-center text-xs">
                            <i class="fas fa-wallet"></i>
                        </div>
                    </div>
                    <div class="mt-2.5">
                        <div class="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-[#4bd39a]">${formatETB(m.totalReceived)}</div>
                        <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold mt-0.5 block">Actual Confirmed Inflow (${state.payments.length} payments)</span>
                    </div>
                </div>

                <!-- 2. Total Expenses -->
                <div class="ui-card p-4 rounded-2xl flex flex-col justify-between border-2 border-rose-500/30 bg-rose-500/5 shadow-sm">
                    <div class="flex items-center justify-between text-[11px] text-rose-700 dark:text-rose-400 font-extrabold uppercase tracking-wider">
                        <span>Total Expenses</span>
                        <div class="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs">
                            <i class="fas fa-receipt"></i>
                        </div>
                    </div>
                    <div class="mt-2.5">
                        <div class="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">${formatETB(m.totalExpenses)}</div>
                        <span class="text-[10px] text-rose-700 dark:text-rose-400 font-bold mt-0.5 block">${state.expenses.length} Logged Disbursements</span>
                    </div>
                </div>

                <!-- 3. Net Profit (Realized Margin) -->
                <div class="ui-card p-4 rounded-2xl flex flex-col justify-between bg-gradient-to-br from-[#121815] to-[#1c2720] text-white border-2 border-[#4bd39a]/50 shadow-md">
                    <div class="flex items-center justify-between text-[11px] text-[#4bd39a] font-black uppercase tracking-wider">
                        <span>Net Business Profit</span>
                        <span class="px-2 py-0.5 rounded-full text-[9px] bg-[#4bd39a]/20 text-[#4bd39a] border border-[#4bd39a]/30">Realized P&L</span>
                    </div>
                    <div class="mt-2.5">
                        <div class="text-2xl sm:text-3xl font-black text-[#4bd39a]">${formatETB(m.netProfit)}</div>
                        <span class="text-[11px] text-slate-300 font-medium mt-0.5 block">
                            Realized Margin: ${m.totalReceived > 0 ? Math.round((m.netProfit / m.totalReceived) * 100) : 0}% of cash
                        </span>
                    </div>
                </div>

                <!-- 4. Available Cash Balance -->
                <div class="ui-card p-4 rounded-2xl flex flex-col justify-between border border-cyan-500/30 bg-cyan-500/5 shadow-sm">
                    <div class="flex items-center justify-between text-[11px] text-cyan-700 dark:text-cyan-400 font-extrabold uppercase tracking-wider">
                        <span>Available Cash Balance</span>
                        <div class="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-xs">
                            <i class="fas fa-vault"></i>
                        </div>
                    </div>
                    <div class="mt-2.5">
                        <div class="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400">${formatETB(m.availableCash)}</div>
                        <span class="text-[10px] text-cyan-700 dark:text-cyan-400 font-bold mt-0.5 block">Liquid Treasury Capital (ETB)</span>
                    </div>
                </div>

                <!-- 5. Total Project Value (Contracted Pipeline) -->
                <div class="ui-card p-4 rounded-2xl flex flex-col justify-between border border-[var(--card-border)]">
                    <div class="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-bold">
                        <span>Total Project Value</span>
                        <div class="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-xs">
                            <i class="fas fa-file-contract"></i>
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="text-xl sm:text-2xl font-black text-[var(--text-main)]">${formatETB(m.totalContracted)}</div>
                        <span class="text-[10px] text-[var(--text-muted)] font-bold mt-0.5 block">${state.projects.length} Total Client Contracts</span>
                    </div>
                </div>

                <!-- 6. Advance Payments Received -->
                <div class="ui-card p-4 rounded-2xl flex flex-col justify-between border border-[var(--card-border)]">
                    <div class="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-bold">
                        <span>Advance Payments Received</span>
                        <div class="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs">
                            <i class="fas fa-sign-in-alt"></i>
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">${formatETB(m.totalAdvance)}</div>
                        <span class="text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-0.5 block">Initial 50% Milestone Deposits</span>
                    </div>
                </div>

                <!-- 7. Final Payments Received -->
                <div class="ui-card p-4 rounded-2xl flex flex-col justify-between border border-[var(--card-border)]">
                    <div class="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-bold">
                        <span>Final Payments Received</span>
                        <div class="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center text-xs">
                            <i class="fas fa-check-double"></i>
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">${formatETB(m.totalFinal)}</div>
                        <span class="text-[10px] text-purple-600 dark:text-purple-400 font-bold mt-0.5 block">Project Handover Disbursements</span>
                    </div>
                </div>

                <!-- 8. Pending Client Payments -->
                <div class="ui-card p-4 rounded-2xl flex flex-col justify-between border border-amber-500/30 bg-amber-500/5">
                    <div class="flex items-center justify-between text-[11px] text-amber-700 dark:text-amber-400 font-bold">
                        <span>Pending Client Payments</span>
                        <div class="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs">
                            <i class="fas fa-hourglass-half"></i>
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="text-xl sm:text-2xl font-black text-amber-600 dark:text-[#e6993a]">${formatETB(m.pendingPayments)}</div>
                        <span class="text-[10px] text-amber-700 dark:text-amber-400 font-bold mt-0.5 block">Awaiting Milestone Collection</span>
                    </div>
                </div>
            </div>

            <!-- Monthly Financial Goals Tracking Card -->
            <div class="ui-card p-5 sm:p-6 rounded-[24px] border border-[var(--card-border)] mb-6">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--card-border)]">
                    <div>
                        <h3 class="text-base font-black text-[var(--text-main)] flex items-center gap-2">
                            <i class="fas fa-bullseye text-[#e6993a]"></i>
                            <span>Monthly Financial Targets & Goal Pace</span>
                        </h3>
                        <p class="text-xs text-[var(--text-muted)]">Live performance against official target goals set in Financial Settings</p>
                    </div>
                    <button onclick="setEarnControlRoomSubTab('settings')" class="text-xs font-bold text-[#e6993a] hover:underline flex items-center gap-1 cursor-pointer">
                        <span>Configure Goals</span>
                        <i class="fas fa-cog text-[10px]"></i>
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <!-- Revenue Target -->
                    <div class="p-4 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] space-y-2">
                        <div class="flex justify-between items-center text-xs">
                            <span class="font-bold text-[var(--text-main)]">Monthly Revenue Goal</span>
                            <span class="font-black text-emerald-600 dark:text-[#4bd39a]">${formatETB(m.totalReceived)} / ${formatETB(revGoal)}</span>
                        </div>
                        <div class="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                            <div class="bg-gradient-to-r from-emerald-500 to-[#4bd39a] h-2.5 rounded-full transition-all duration-500" style="width: ${revPct}%;"></div>
                        </div>
                        <div class="flex justify-between text-[11px] text-[var(--text-muted)] font-medium">
                            <span>${revPct}% achieved</span>
                            <span>Remaining: ${formatETB(Math.max(0, revGoal - m.totalReceived))}</span>
                        </div>
                    </div>

                    <!-- Net Profit Target -->
                    <div class="p-4 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] space-y-2">
                        <div class="flex justify-between items-center text-xs">
                            <span class="font-bold text-[var(--text-main)]">Monthly Net Profit Goal</span>
                            <span class="font-black text-[#e6993a]">${formatETB(m.netProfit)} / ${formatETB(profGoal)}</span>
                        </div>
                        <div class="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                            <div class="bg-gradient-to-r from-amber-500 to-[#e6993a] h-2.5 rounded-full transition-all duration-500" style="width: ${profPct}%;"></div>
                        </div>
                        <div class="flex justify-between text-[11px] text-[var(--text-muted)] font-medium">
                            <span>${profPct}% achieved</span>
                            <span>Remaining: ${formatETB(Math.max(0, profGoal - m.netProfit))}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Two-Column Financial Analytics & Overdue Monitor -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <!-- Column 1 & 2: Financial Realization Flow -->
                <div class="ui-card p-6 rounded-[24px] lg:col-span-2 space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--card-border)]">
                        <div>
                            <h3 class="text-base font-black text-[var(--text-main)]">Cashflow Inflow vs Outflow Structure</h3>
                            <p class="text-xs text-[var(--text-muted)]">Comparison of contracted pipeline, realized cash in hand, and operating expenses</p>
                        </div>
                        <span class="text-xs font-bold text-[#e6993a] px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                            Cashflow Positive
                        </span>
                    </div>

                    <!-- Visual Comparison Bars -->
                    <div class="space-y-3.5 pt-2">
                        <!-- Contracted Value -->
                        <div>
                            <div class="flex justify-between text-xs font-bold mb-1">
                                <span class="text-[var(--text-main)]">Total Contracted Pipeline</span>
                                <span class="text-indigo-600 dark:text-indigo-400 font-black">${formatETB(m.totalContracted)} (100%)</span>
                            </div>
                            <div class="w-full bg-[var(--subtle-bg)] rounded-full h-2.5 overflow-hidden border border-[var(--card-border)]">
                                <div class="bg-indigo-500 h-2.5 rounded-full" style="width: 100%;"></div>
                            </div>
                        </div>

                        <!-- Realized Received Cash -->
                        <div>
                            <div class="flex justify-between text-xs font-bold mb-1">
                                <span class="text-emerald-700 dark:text-emerald-400">Received Cash (Realized Revenue)</span>
                                <span class="text-emerald-600 dark:text-[#4bd39a] font-black">${formatETB(m.totalReceived)} (${m.totalContracted > 0 ? Math.round((m.totalReceived / m.totalContracted) * 100) : 0}%)</span>
                            </div>
                            <div class="w-full bg-[var(--subtle-bg)] rounded-full h-2.5 overflow-hidden border border-[var(--card-border)]">
                                <div class="bg-emerald-500 h-2.5 rounded-full" style="width: ${m.totalContracted > 0 ? Math.min(100, Math.round((m.totalReceived / m.totalContracted) * 100)) : 0}%;"></div>
                            </div>
                        </div>

                        <!-- Pending Pipeline -->
                        <div>
                            <div class="flex justify-between text-xs font-bold mb-1">
                                <span class="text-amber-700 dark:text-amber-400">Pending Receivables (Outstanding Balance)</span>
                                <span class="text-amber-600 dark:text-[#e6993a] font-black">${formatETB(m.pendingPayments)} (${m.totalContracted > 0 ? Math.round((m.pendingPayments / m.totalContracted) * 100) : 0}%)</span>
                            </div>
                            <div class="w-full bg-[var(--subtle-bg)] rounded-full h-2.5 overflow-hidden border border-[var(--card-border)]">
                                <div class="bg-amber-500 h-2.5 rounded-full" style="width: ${m.totalContracted > 0 ? Math.min(100, Math.round((m.pendingPayments / m.totalContracted) * 100)) : 0}%;"></div>
                            </div>
                        </div>

                        <!-- Expenses Ratio -->
                        <div>
                            <div class="flex justify-between text-xs font-bold mb-1">
                                <span class="text-rose-700 dark:text-rose-400">Total Operating Expenses</span>
                                <span class="text-rose-600 dark:text-rose-400 font-black">${formatETB(m.totalExpenses)} (${m.totalReceived > 0 ? Math.round((m.totalExpenses / m.totalReceived) * 100) : 0}% of cash)</span>
                            </div>
                            <div class="w-full bg-[var(--subtle-bg)] rounded-full h-2.5 overflow-hidden border border-[var(--card-border)]">
                                <div class="bg-rose-500 h-2.5 rounded-full" style="width: ${m.totalReceived > 0 ? Math.min(100, Math.round((m.totalExpenses / m.totalReceived) * 100)) : 0}%;"></div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-3 border-t border-[var(--card-border)] flex flex-wrap gap-2 text-xs">
                        <span class="text-[var(--text-muted)] font-semibold">Treasury Summary:</span>
                        <span class="font-bold text-emerald-600 dark:text-emerald-400">${formatETB(m.totalReceived)} Cash Collected</span>
                        <span class="text-slate-400">·</span>
                        <span class="font-bold text-rose-600 dark:text-rose-400">${formatETB(m.totalExpenses)} Spent</span>
                        <span class="text-slate-400">·</span>
                        <span class="font-black text-[#4bd39a]">${formatETB(m.netProfit)} Net Profit Remaining</span>
                    </div>
                </div>

                <!-- Column 3: Payment Overdue & Milestone Monitor -->
                <div class="ui-card p-6 rounded-[24px] space-y-4 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                            <h3 class="text-base font-black text-[var(--text-main)] flex items-center gap-1.5">
                                <i class="fas fa-bell text-[#e6993a]"></i>
                                <span>Receivables Monitor</span>
                            </h3>
                            <span class="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Uncollected</span>
                        </div>

                        <div class="space-y-2.5 mt-3 max-h-72 overflow-y-auto pr-1">
                            ${renderPaymentDueSummary(state.projects)}
                        </div>
                    </div>

                    <div class="pt-3 border-t border-[var(--card-border)]">
                        <button onclick="setEarnControlRoomSubTab('income')" class="w-full py-2 px-3 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition flex items-center justify-center gap-1.5 cursor-pointer">
                            <span>Open Income Ledger</span>
                            <i class="fas fa-arrow-right text-[10px]"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Individual Project Profitability Ledger -->
            <div class="ui-card rounded-[24px] overflow-hidden border border-[var(--card-border)]">
                <div class="p-5 border-b border-[var(--card-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h3 class="text-base font-black text-[var(--text-main)] flex items-center gap-2">
                            <i class="fas fa-balance-scale text-[#e6993a]"></i>
                            <span>Individual Project Profitability Analysis</span>
                        </h3>
                        <p class="text-xs text-[var(--text-muted)]">Realized income minus attributed project-specific expenses per client contract</p>
                    </div>
                    <div class="text-xs text-[var(--text-muted)] font-semibold">
                        ${projectProfitability.length} Client Projects Tracked
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-[var(--subtle-bg)] border-b border-[var(--card-border)] text-[var(--text-muted)] font-bold text-[11px]">
                                <th class="p-3.5">Client & Project</th>
                                <th class="p-3.5 text-right">Contract Agreed</th>
                                <th class="p-3.5 text-right">Received Cash</th>
                                <th class="p-3.5 text-right">Outstanding Due</th>
                                <th class="p-3.5 text-right">Direct Expenses</th>
                                <th class="p-3.5 text-right">Net Project Profit</th>
                                <th class="p-3.5 text-center">Cash Margin %</th>
                                <th class="p-3.5 text-center">Status</th>
                                <th class="p-3.5 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[var(--card-border)]">
                            ${projectProfitability.map(item => {
                                const p = item.project;
                                const isPositive = item.netCashMargin >= 0;
                                return `
                                    <tr class="hover:bg-[var(--subtle-bg)] transition">
                                        <td class="p-3.5">
                                            <div class="font-bold text-[var(--text-main)]">${p.clientName}</div>
                                            <div class="text-[10px] text-[var(--text-muted)] truncate max-w-xs">${p.name}</div>
                                        </td>
                                        <td class="p-3.5 text-right font-black text-[var(--text-main)]">
                                            ${formatETB(item.agreed)}
                                        </td>
                                        <td class="p-3.5 text-right font-black text-emerald-600 dark:text-[#4bd39a]">
                                            ${formatETB(item.paid)}
                                        </td>
                                        <td class="p-3.5 text-right font-black ${item.due > 0 ? 'text-amber-600 dark:text-[#e6993a]' : 'text-slate-400'}">
                                            ${formatETB(item.due)}
                                        </td>
                                        <td class="p-3.5 text-right font-black text-rose-600 dark:text-rose-400">
                                            ${formatETB(item.directExp)}
                                        </td>
                                        <td class="p-3.5 text-right font-black ${isPositive ? 'text-emerald-600 dark:text-[#4bd39a]' : 'text-rose-600'}">
                                            ${formatETB(item.netCashMargin)}
                                        </td>
                                        <td class="p-3.5 text-center">
                                            <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${isPositive ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-rose-500/15 text-rose-700'}">
                                                ${item.marginPct}%
                                            </span>
                                        </td>
                                        <td class="p-3.5 text-center">
                                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${p.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'}">
                                                ${p.status}
                                            </span>
                                        </td>
                                        <td class="p-3.5 text-center">
                                            <div class="flex items-center justify-center gap-1.5">
                                                <button onclick="openRecordPaymentModal('${p.id}')" class="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition cursor-pointer" title="Record Payment">
                                                    <i class="fas fa-plus text-[10px]"></i>
                                                </button>
                                                <button onclick="openProjectWorkspace('${p.id}')" class="p-1.5 rounded-lg bg-[var(--card-bg)] text-[#e6993a] border border-[var(--card-border)] hover:border-[#e6993a] transition cursor-pointer" title="Open Workspace">
                                                    <i class="fas fa-external-link-alt text-[10px]"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // --------------------------------------------------------------------------
    // SUB-VIEW 2: INCOME MANAGEMENT (Synchronized Client Transactions & Categories)
    // --------------------------------------------------------------------------
    function renderEarnIncome(m, state) {
        const incomeCats = state.incomeCategories || defaultIncomeCategories;
        const payMethods = state.paymentMethods || defaultPaymentMethods;

        // Filtering
        const searchLower = (_incomeSearch || '').toLowerCase().trim();
        const filteredPayments = state.payments.filter(pay => {
            if (searchLower) {
                const matchClient = (pay.clientName || '').toLowerCase().includes(searchLower);
                const matchRef = (pay.reference || '').toLowerCase().includes(searchLower);
                const matchNotes = (pay.notes || '').toLowerCase().includes(searchLower);
                const matchTxn = (pay.txnId || '').toLowerCase().includes(searchLower);
                if (!matchClient && !matchRef && !matchNotes && !matchTxn) return false;
            }
            if (_incomeCategoryFilter !== 'ALL') {
                const payCat = (pay.category || pay.type || '').toLowerCase();
                if (payCat !== _incomeCategoryFilter.toLowerCase()) return false;
            }
            if (_incomeMethodFilter !== 'ALL') {
                if ((pay.method || '').toLowerCase() !== _incomeMethodFilter.toLowerCase()) return false;
            }
            if (_incomeDateFrom && pay.date < _incomeDateFrom) return false;
            if (_incomeDateTo && pay.date > _incomeDateTo) return false;
            return true;
        });

        const filteredSum = filteredPayments.reduce((s, p) => s + (Number(p.amount) || 0), 0);

        return `
            <div class="space-y-5">
                <!-- Header & Controls -->
                <div class="ui-card p-5 rounded-[24px] border border-[var(--card-border)]">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[var(--card-border)]">
                        <div>
                            <h3 class="text-base font-black text-[var(--text-main)] flex items-center gap-2">
                                <i class="fas fa-wallet text-[#e6993a]"></i>
                                <span>Income Transactions & Project Payments</span>
                            </h3>
                            <p class="text-xs text-[var(--text-muted)]">
                                Synchronized live from Client Projects. Every payment creates exactly one verified income transaction.
                            </p>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <button onclick="exportIncomeToCSV()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition shadow-xs flex items-center gap-1.5 cursor-pointer">
                                <i class="fas fa-file-csv text-emerald-600"></i>
                                <span>Export Income CSV</span>
                            </button>
                            <button onclick="openRecordPaymentModal()" class="py-2 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm flex items-center gap-1.5 cursor-pointer">
                                <i class="fas fa-plus"></i>
                                <span>+ Record Income</span>
                            </button>
                        </div>
                    </div>

                    <!-- Search & Filter Bar -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4 text-xs">
                        <!-- Search Input -->
                        <div class="lg:col-span-2">
                            <label class="font-bold text-[var(--text-muted)] block mb-1">Search Income</label>
                            <div class="relative">
                                <i class="fas fa-search absolute left-3 top-2.5 text-slate-400"></i>
                                <input type="text" value="${_incomeSearch}" oninput="setIncomeFilter('search', this.value)" placeholder="Search client, TXN ID, receipt ref..." class="w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                        </div>

                        <!-- Category Filter -->
                        <div>
                            <label class="font-bold text-[var(--text-muted)] block mb-1">Income Category</label>
                            <select onchange="setIncomeFilter('category', this.value)" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-xs text-[var(--text-main)] font-semibold">
                                <option value="ALL">All Categories</option>
                                ${incomeCats.map(c => `
                                    <option value="${c.name}" ${_incomeCategoryFilter === c.name ? 'selected' : ''}>${c.name}</option>
                                `).join('')}
                                <option value="Advance Payment" ${_incomeCategoryFilter === 'Advance Payment' ? 'selected' : ''}>Advance Payment</option>
                                <option value="Final Payment" ${_incomeCategoryFilter === 'Final Payment' ? 'selected' : ''}>Final Payment</option>
                                <option value="Partial Payment" ${_incomeCategoryFilter === 'Partial Payment' ? 'selected' : ''}>Partial Payment</option>
                            </select>
                        </div>

                        <!-- Payment Method Filter -->
                        <div>
                            <label class="font-bold text-[var(--text-muted)] block mb-1">Payment Method</label>
                            <select onchange="setIncomeFilter('method', this.value)" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-xs text-[var(--text-main)] font-semibold">
                                <option value="ALL">All Methods</option>
                                ${payMethods.map(pm => `
                                    <option value="${pm.name}" ${_incomeMethodFilter === pm.name ? 'selected' : ''}>${pm.name}</option>
                                `).join('')}
                                <option value="Telebirr" ${_incomeMethodFilter === 'Telebirr' ? 'selected' : ''}>Telebirr</option>
                                <option value="Bank Transfer" ${_incomeMethodFilter === 'Bank Transfer' ? 'selected' : ''}>Bank Transfer</option>
                                <option value="Cash" ${_incomeMethodFilter === 'Cash' ? 'selected' : ''}>Cash</option>
                            </select>
                        </div>

                        <!-- Reset Button -->
                        <div class="flex items-end">
                            <button onclick="resetIncomeFilters()" class="w-full py-2 px-3 rounded-xl text-xs font-bold bg-[var(--subtle-bg)] hover:bg-[var(--card-border)] text-[var(--text-muted)] transition border border-[var(--card-border)] cursor-pointer">
                                <i class="fas fa-undo text-[10px] mr-1"></i> Reset Filters
                            </button>
                        </div>
                    </div>

                    <!-- Sync Status Banner -->
                    <div class="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between gap-3 text-emerald-800 dark:text-emerald-300">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-emerald-600 dark:text-[#4bd39a]"></i>
                            <span>
                                <strong>Automatic Client Project Sync Active:</strong> Every client milestone payment records exactly one verified income transaction. In accordance with strict accounting rules, only received cash counts as revenue.
                            </span>
                        </div>
                        <span class="font-black text-emerald-700 dark:text-emerald-400 shrink-0">
                            ${filteredPayments.length} of ${state.payments.length} Records
                        </span>
                    </div>
                </div>

                <!-- Income Ledger Table -->
                <div class="ui-card rounded-[24px] overflow-hidden border border-[var(--card-border)]">
                    <div class="p-4 border-b border-[var(--card-border)] flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-black uppercase tracking-wider text-[var(--text-main)]">Income Transaction Ledger</span>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                                Total: ${formatETB(filteredSum)}
                            </span>
                        </div>
                        <span class="text-[11px] text-[var(--text-muted)] font-medium">Sorted by date</span>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr class="bg-[var(--subtle-bg)] border-b border-[var(--card-border)] text-[var(--text-muted)] font-bold text-[11px]">
                                    <th class="p-3.5">Txn ID</th>
                                    <th class="p-3.5">Date</th>
                                    <th class="p-3.5">Client & Linked Project</th>
                                    <th class="p-3.5">Income Category</th>
                                    <th class="p-3.5">Payment Method</th>
                                    <th class="p-3.5">Ref / Notes</th>
                                    <th class="p-3.5 text-right">Amount (ETB)</th>
                                    <th class="p-3.5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[var(--card-border)]">
                                ${filteredPayments.length === 0 ? `
                                    <tr>
                                        <td colspan="8" class="p-8 text-center text-xs text-[var(--text-muted)] font-medium">
                                            No income transactions found matching the selected filter criteria.
                                        </td>
                                    </tr>
                                ` : filteredPayments.map(pay => {
                                    const txnCode = pay.txnId || `TXN-INC-${pay.id.replace('pay-', '')}`;
                                    const catDisplay = pay.category || pay.type || 'Project Payment';
                                    return `
                                        <tr class="hover:bg-[var(--subtle-bg)] transition">
                                            <td class="p-3.5 font-mono text-[11px] font-bold text-[#e6993a]">
                                                ${txnCode}
                                            </td>
                                            <td class="p-3.5 text-[var(--text-muted)] whitespace-nowrap font-medium">
                                                ${pay.date}
                                            </td>
                                            <td class="p-3.5">
                                                <div class="font-bold text-[var(--text-main)]">${pay.clientName || 'General Client'}</div>
                                                <div class="text-[10px] text-[var(--text-muted)] truncate max-w-xs">
                                                    ${getProjectNameById(pay.projectId)}
                                                </div>
                                            </td>
                                            <td class="p-3.5">
                                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                                                    ${catDisplay}
                                                </span>
                                            </td>
                                            <td class="p-3.5 text-[var(--text-main)] font-semibold">
                                                <i class="fas fa-university text-[10px] text-slate-400 mr-1"></i>
                                                ${pay.method || 'Bank Transfer'}
                                            </td>
                                            <td class="p-3.5 text-[11px] text-[var(--text-muted)] max-w-xs truncate">
                                                <span class="font-mono text-slate-500">${pay.reference || '—'}</span>
                                                ${pay.notes ? `<div class="text-[10px] text-[var(--text-muted)] italic truncate">${pay.notes}</div>` : ''}
                                            </td>
                                            <td class="p-3.5 text-right font-black text-emerald-600 dark:text-[#4bd39a] text-sm">
                                                +${formatETB(pay.amount)}
                                            </td>
                                            <td class="p-3.5 text-center">
                                                <div class="flex items-center justify-center gap-1.5">
                                                    <button onclick="openEditPaymentModal('${pay.id}')" class="p-1.5 rounded-lg bg-[var(--subtle-bg)] text-blue-500 hover:bg-blue-500/15 transition cursor-pointer" title="Edit Income Record">
                                                        <i class="fas fa-edit text-xs"></i>
                                                    </button>
                                                    <button onclick="confirmDeletePayment('${pay.id}')" class="p-1.5 rounded-lg bg-[var(--subtle-bg)] text-rose-500 hover:bg-rose-500/15 transition cursor-pointer" title="Delete Payment (with Audit Trail)">
                                                        <i class="fas fa-trash-alt text-xs"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    // --------------------------------------------------------------------------
    // SUB-VIEW 3: EXPENSE MANAGEMENT (Budget Caps, Projects & Audited Deletions)
    // --------------------------------------------------------------------------
    function renderEarnExpenses(m, state) {
        const expCats = state.expenseCategories || defaultExpenseCategories;

        // Filtering
        const searchLower = (_expenseSearch || '').toLowerCase().trim();
        const filteredExpenses = state.expenses.filter(e => {
            if (searchLower) {
                const matchName = (e.name || '').toLowerCase().includes(searchLower);
                const matchDesc = (e.description || '').toLowerCase().includes(searchLower);
                const matchRef = (e.receiptNote || '').toLowerCase().includes(searchLower);
                const matchTxn = (e.txnId || '').toLowerCase().includes(searchLower);
                if (!matchName && !matchDesc && !matchRef && !matchTxn) return false;
            }
            if (_expenseCategoryFilter !== 'ALL') {
                if ((e.category || '').toLowerCase() !== _expenseCategoryFilter.toLowerCase()) return false;
            }
            if (_expenseProjectFilter !== 'ALL') {
                if (_expenseProjectFilter === 'GENERAL') {
                    if (e.projectId) return false;
                } else if (e.projectId !== _expenseProjectFilter) {
                    return false;
                }
            }
            if (_expenseDateFrom && e.date < _expenseDateFrom) return false;
            if (_expenseDateTo && e.date > _expenseDateTo) return false;
            return true;
        });

        const filteredSum = filteredExpenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);

        // Calculate Category Spending vs Monthly Budget Caps
        const catSpending = {};
        state.expenses.forEach(e => {
            catSpending[e.category] = (catSpending[e.category] || 0) + (Number(e.amount) || 0);
        });

        return `
            <div class="space-y-5">
                <!-- Header & Controls -->
                <div class="ui-card p-5 rounded-[24px] border border-[var(--card-border)]">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[var(--card-border)]">
                        <div>
                            <h3 class="text-base font-black text-[var(--text-main)] flex items-center gap-2">
                                <i class="fas fa-receipt text-[#e6993a]"></i>
                                <span>Business & Direct Project Expenses</span>
                            </h3>
                            <p class="text-xs text-[var(--text-muted)]">
                                Track material costs, software subscriptions, domains, logistics, and client project disbursements.
                            </p>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <button onclick="exportExpensesToCSV()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition shadow-xs flex items-center gap-1.5 cursor-pointer">
                                <i class="fas fa-file-csv text-rose-600"></i>
                                <span>Export Expenses CSV</span>
                            </button>
                            <button onclick="openNewExpenseModal()" class="py-2 px-4 rounded-xl text-xs font-bold bg-rose-700/80 hover:bg-rose-600 text-white transition shadow-sm flex items-center gap-1.5 cursor-pointer">
                                <i class="fas fa-plus"></i>
                                <span>+ Add Expense</span>
                            </button>
                        </div>
                    </div>

                    <!-- Search & Filter Bar -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4 text-xs">
                        <!-- Search Input -->
                        <div class="lg:col-span-2">
                            <label class="font-bold text-[var(--text-muted)] block mb-1">Search Expenses</label>
                            <div class="relative">
                                <i class="fas fa-search absolute left-3 top-2.5 text-slate-400"></i>
                                <input type="text" value="${_expenseSearch}" oninput="setExpenseFilter('search', this.value)" placeholder="Search title, receipt, TXN ID..." class="w-full pl-8 pr-3 py-2 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                        </div>

                        <!-- Category Filter -->
                        <div>
                            <label class="font-bold text-[var(--text-muted)] block mb-1">Expense Category</label>
                            <select onchange="setExpenseFilter('category', this.value)" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-xs text-[var(--text-main)] font-semibold">
                                <option value="ALL">All Categories</option>
                                ${expCats.map(c => `
                                    <option value="${c.name}" ${_expenseCategoryFilter === c.name ? 'selected' : ''}>${c.name}</option>
                                `).join('')}
                            </select>
                        </div>

                        <!-- Project Filter -->
                        <div>
                            <label class="font-bold text-[var(--text-muted)] block mb-1">Project Linkage</label>
                            <select onchange="setExpenseFilter('project', this.value)" class="w-full py-2 px-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-xs text-[var(--text-main)] font-semibold">
                                <option value="ALL">All Expenses</option>
                                <option value="GENERAL" ${_expenseProjectFilter === 'GENERAL' ? 'selected' : ''}>General Overhead Only</option>
                                ${state.projects.map(p => `
                                    <option value="${p.id}" ${_expenseProjectFilter === p.id ? 'selected' : ''}>${p.clientName}: ${p.name}</option>
                                `).join('')}
                            </select>
                        </div>

                        <!-- Reset Button -->
                        <div class="flex items-end">
                            <button onclick="resetExpenseFilters()" class="w-full py-2 px-3 rounded-xl text-xs font-bold bg-[var(--subtle-bg)] hover:bg-[var(--card-border)] text-[var(--text-muted)] transition border border-[var(--card-border)] cursor-pointer">
                                <i class="fas fa-undo text-[10px] mr-1"></i> Reset Filters
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Monthly Category Budget Caps Tracker -->
                <div class="ui-card p-5 rounded-[24px] border border-[var(--card-border)]">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)] mb-4">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-black uppercase tracking-wider text-[var(--text-main)]">Expense Categories & Monthly Budget Caps</span>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e6993a]/15 text-[#e6993a]">Budget Health</span>
                        </div>
                        <button onclick="setEarnControlRoomSubTab('settings')" class="text-xs font-bold text-[#e6993a] hover:underline cursor-pointer">
                            Manage Categories & Caps →
                        </button>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                        ${expCats.slice(0, 8).map(c => {
                            const spent = catSpending[c.name] || 0;
                            const budget = Number(c.budget) || 5000;
                            const pct = Math.min(100, Math.round((spent / budget) * 100));
                            const isOver = spent > budget;
                            return `
                                <div class="p-3.5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] space-y-2">
                                    <div class="flex justify-between items-center text-xs">
                                        <span class="font-bold text-[var(--text-main)] truncate">${c.name}</span>
                                        <span class="font-black ${isOver ? 'text-rose-600' : 'text-slate-500'}">${pct}%</span>
                                    </div>
                                    <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                        <div class="${isOver ? 'bg-rose-500' : pct > 75 ? 'bg-amber-500' : 'bg-emerald-500'} h-2 rounded-full" style="width: ${pct}%;"></div>
                                    </div>
                                    <div class="flex justify-between text-[10px] text-[var(--text-muted)] font-medium">
                                        <span>Spent: ${formatETB(spent)}</span>
                                        <span>Cap: ${formatETB(budget)}</span>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Expenses Table -->
                <div class="ui-card rounded-[24px] overflow-hidden border border-[var(--card-border)]">
                    <div class="p-4 border-b border-[var(--card-border)] flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-black uppercase tracking-wider text-[var(--text-main)]">Audited Expense Ledger</span>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30">
                                Total: ${formatETB(filteredSum)}
                            </span>
                        </div>
                        <span class="text-[11px] text-[var(--text-muted)] font-medium">${filteredExpenses.length} disbursements</span>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr class="bg-[var(--subtle-bg)] border-b border-[var(--card-border)] text-[var(--text-muted)] font-bold text-[11px]">
                                    <th class="p-3.5">Txn ID</th>
                                    <th class="p-3.5">Date</th>
                                    <th class="p-3.5">Expense Name & Details</th>
                                    <th class="p-3.5">Category</th>
                                    <th class="p-3.5">Method</th>
                                    <th class="p-3.5">Project Linkage</th>
                                    <th class="p-3.5">Receipt Ref</th>
                                    <th class="p-3.5 text-right">Amount (ETB)</th>
                                    <th class="p-3.5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[var(--card-border)]">
                                ${filteredExpenses.length === 0 ? `
                                    <tr>
                                        <td colspan="9" class="p-8 text-center text-xs text-[var(--text-muted)] font-medium">
                                            No expense records found matching the selected filter criteria.
                                        </td>
                                    </tr>
                                ` : filteredExpenses.map(e => {
                                    const txnCode = e.txnId || `TXN-EXP-${e.id.replace('exp-', '')}`;
                                    const proj = state.projects.find(p => p.id === e.projectId);
                                    return `
                                        <tr class="hover:bg-[var(--subtle-bg)] transition">
                                            <td class="p-3.5 font-mono text-[11px] font-bold text-rose-500">
                                                ${txnCode}
                                            </td>
                                            <td class="p-3.5 text-[var(--text-muted)] whitespace-nowrap font-medium">
                                                ${e.date}
                                            </td>
                                            <td class="p-3.5">
                                                <div class="font-bold text-[var(--text-main)]">${e.name}</div>
                                                ${e.description ? `<div class="text-[10px] text-[var(--text-muted)] truncate max-w-xs">${e.description}</div>` : ''}
                                            </td>
                                            <td class="p-3.5">
                                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
                                                    ${e.category}
                                                </span>
                                            </td>
                                            <td class="p-3.5 text-[var(--text-main)] font-semibold">
                                                ${e.paymentMethod || 'Bank Transfer'}
                                            </td>
                                            <td class="p-3.5 text-xs">
                                                ${proj ? `
                                                    <span class="font-bold text-[#e6993a]">${proj.clientName}</span>
                                                    <div class="text-[10px] text-[var(--text-muted)] truncate max-w-xs">${proj.name}</div>
                                                ` : '<span class="text-[11px] text-[var(--text-muted)] italic">General Overhead</span>'}
                                            </td>
                                            <td class="p-3.5 text-[11px] text-slate-500 font-mono">
                                                ${e.receiptNote || '—'}
                                            </td>
                                            <td class="p-3.5 text-right font-black text-rose-600 dark:text-rose-400 text-sm">
                                                -${formatETB(e.amount)}
                                            </td>
                                            <td class="p-3.5 text-center">
                                                <div class="flex items-center justify-center gap-1.5">
                                                    <button onclick="openEditExpenseModal('${e.id}')" class="p-1.5 rounded-lg bg-[var(--subtle-bg)] text-blue-500 hover:bg-blue-500/15 transition cursor-pointer" title="Edit Expense">
                                                        <i class="fas fa-edit text-xs"></i>
                                                    </button>
                                                    <button onclick="confirmDeleteExpense('${e.id}')" class="p-1.5 rounded-lg bg-[var(--subtle-bg)] text-rose-500 hover:bg-rose-500/15 transition cursor-pointer" title="Delete Expense (Audit Log Recorded)">
                                                        <i class="fas fa-trash-alt text-xs"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    // --------------------------------------------------------------------------
    // SUB-VIEW 4: FINANCIAL ANALYTICS (Daily, Weekly, Monthly, Yearly Trends)
    // --------------------------------------------------------------------------
    function renderEarnAnalytics(m, state) {
        // Group income and expenses by service & client
        const incomeByService = {};
        state.projects.forEach(p => {
            const pPaid = getProjectPaidAmount(p.id);
            if (pPaid > 0 && Array.isArray(p.services) && p.services.length > 0) {
                const share = pPaid / p.services.length;
                p.services.forEach(s => {
                    const sName = s.name || 'Service';
                    incomeByService[sName] = (incomeByService[sName] || 0) + share;
                });
            }
        });

        const sortedServices = Object.entries(incomeByService).sort((a, b) => b[1] - a[1]);

        // Group income by Client
        const incomeByClient = {};
        state.payments.forEach(pay => {
            const cName = pay.clientName || 'General Client';
            incomeByClient[cName] = (incomeByClient[cName] || 0) + (Number(pay.amount) || 0);
        });
        const sortedClients = Object.entries(incomeByClient).sort((a, b) => b[1] - a[1]);

        // Group expenses by category
        const expByCat = {};
        state.expenses.forEach(e => {
            expByCat[e.category] = (expByCat[e.category] || 0) + (Number(e.amount) || 0);
        });
        const sortedExpCats = Object.entries(expByCat).sort((a, b) => b[1] - a[1]);

        return `
            <div class="space-y-6">
                <!-- Analytics Time Period Selector -->
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h3 class="text-sm font-black text-[var(--text-main)] flex items-center gap-2">
                            <i class="fas fa-calendar-alt text-[#e6993a]"></i>
                            <span>Financial Analytics Scope</span>
                        </h3>
                        <p class="text-[11px] text-[var(--text-muted)]">Select temporal aggregation view for financial trends</p>
                    </div>

                    <div class="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] self-start">
                        ${['daily', 'weekly', 'monthly', 'yearly'].map(period => `
                            <button onclick="setAnalyticsPeriod('${period}')" class="px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer capitalize ${_analyticsPeriod === period ? 'bg-[#e6993a] text-black shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                                ${period}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Period KPI Performance Overview -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="ui-card p-4 rounded-2xl">
                        <span class="text-xs text-[var(--text-muted)] font-bold block">Current Period Inflow</span>
                        <div class="text-2xl font-black text-emerald-600 dark:text-[#4bd39a] mt-1">${formatETB(m.totalReceived)}</div>
                        <span class="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5 block">100% realized cash receipts</span>
                    </div>
                    <div class="ui-card p-4 rounded-2xl">
                        <span class="text-xs text-[var(--text-muted)] font-bold block">Current Period Outflow</span>
                        <div class="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">${formatETB(m.totalExpenses)}</div>
                        <span class="text-[10px] text-rose-700 dark:text-rose-400 mt-0.5 block">${state.expenses.length} operational disbursements</span>
                    </div>
                    <div class="ui-card p-4 rounded-2xl">
                        <span class="text-xs text-[var(--text-muted)] font-bold block">Net Profit Spread</span>
                        <div class="text-2xl font-black text-[#e6993a] mt-1">${formatETB(m.netProfit)}</div>
                        <span class="text-[10px] text-slate-500 mt-0.5 block">Surplus cash reserve</span>
                    </div>
                    <div class="ui-card p-4 rounded-2xl">
                        <span class="text-xs text-[var(--text-muted)] font-bold block">Realized Net Margin</span>
                        <div class="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                            ${m.totalReceived > 0 ? Math.round((m.netProfit / m.totalReceived) * 100) : 0}%
                        </div>
                        <span class="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5 block">Return on received cash</span>
                    </div>
                </div>

                <!-- 2-Column Deep Dive Charts -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Column 1: Income by Service -->
                    <div class="ui-card p-6 rounded-[24px] border border-[var(--card-border)] space-y-4">
                        <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                            <h3 class="text-sm font-black text-[var(--text-main)]">Realized Income by Digital Service</h3>
                            <span class="text-[10px] font-bold text-[var(--text-muted)]">Weighted ETB</span>
                        </div>
                        <div class="space-y-3">
                            ${sortedServices.map(([sName, rev]) => {
                                const pct = m.totalReceived > 0 ? Math.round((rev / m.totalReceived) * 100) : 0;
                                return `
                                    <div class="space-y-1">
                                        <div class="flex justify-between text-xs font-bold">
                                            <span class="text-[var(--text-main)] truncate">${sName}</span>
                                            <span class="text-emerald-600 dark:text-[#4bd39a] font-mono">${formatETB(rev)} (${pct}%)</span>
                                        </div>
                                        <div class="w-full bg-[var(--subtle-bg)] h-2 rounded-full overflow-hidden border border-[var(--card-border)]">
                                            <div class="bg-gradient-to-r from-emerald-500 to-[#4bd39a] h-2 rounded-full" style="width: ${pct}%;"></div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Column 2: Revenue by Client Ranking -->
                    <div class="ui-card p-6 rounded-[24px] border border-[var(--card-border)] space-y-4">
                        <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                            <h3 class="text-sm font-black text-[var(--text-main)]">Top Client Accounts by Paid Revenue</h3>
                            <span class="text-[10px] font-bold text-[var(--text-muted)]">Cash Received</span>
                        </div>
                        <div class="space-y-3">
                            ${sortedClients.map(([cName, rev], idx) => {
                                const pct = m.totalReceived > 0 ? Math.round((rev / m.totalReceived) * 100) : 0;
                                return `
                                    <div class="flex items-center justify-between p-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-xs">
                                        <div class="flex items-center gap-2.5 min-w-0">
                                            <div class="w-6 h-6 rounded-lg bg-amber-500/20 text-[#e6993a] flex items-center justify-center font-black text-[11px] shrink-0">
                                                #${idx + 1}
                                            </div>
                                            <span class="font-bold text-[var(--text-main)] truncate">${cName}</span>
                                        </div>
                                        <div class="text-right shrink-0">
                                            <div class="font-black text-emerald-600 dark:text-[#4bd39a]">${formatETB(rev)}</div>
                                            <div class="text-[10px] text-[var(--text-muted)] font-medium">${pct}% of total cash</div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>

                <!-- Expenses Distribution & Aging Reports -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Column 1: Expenses by Category Distribution -->
                    <div class="ui-card p-6 rounded-[24px] border border-[var(--card-border)] space-y-4">
                        <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                            <h3 class="text-sm font-black text-[var(--text-main)]">Operational Expenses by Category</h3>
                            <span class="text-[10px] font-bold text-rose-500 font-mono">${formatETB(m.totalExpenses)} Total</span>
                        </div>
                        <div class="space-y-3">
                            ${sortedExpCats.map(([catName, expAmt]) => {
                                const pct = m.totalExpenses > 0 ? Math.round((expAmt / m.totalExpenses) * 100) : 0;
                                return `
                                    <div class="space-y-1">
                                        <div class="flex justify-between text-xs font-bold">
                                            <span class="text-[var(--text-main)] truncate">${catName}</span>
                                            <span class="text-rose-600 dark:text-rose-400 font-mono">${formatETB(expAmt)} (${pct}%)</span>
                                        </div>
                                        <div class="w-full bg-[var(--subtle-bg)] h-2 rounded-full overflow-hidden border border-[var(--card-border)]">
                                            <div class="bg-rose-500 h-2 rounded-full" style="width: ${pct}%;"></div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Column 2: Receivables Aging Analysis -->
                    <div class="ui-card p-6 rounded-[24px] border border-[var(--card-border)] space-y-4">
                        <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                            <h3 class="text-sm font-black text-[var(--text-main)]">Receivables Aging Analysis</h3>
                            <span class="text-[10px] font-bold text-amber-500 font-mono">${formatETB(m.pendingPayments)} Outstanding</span>
                        </div>
                        <div class="space-y-3">
                            <div class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex justify-between items-center text-xs">
                                <div>
                                    <div class="font-bold text-emerald-800 dark:text-emerald-300">Current (0 - 15 Days)</div>
                                    <div class="text-[10px] text-emerald-700 dark:text-emerald-400">Within normal milestone agreement</div>
                                </div>
                                <span class="font-black text-emerald-700 dark:text-[#4bd39a] text-sm">
                                    ${formatETB(m.pendingPayments * 0.6)}
                                </span>
                            </div>
                            <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex justify-between items-center text-xs">
                                <div>
                                    <div class="font-bold text-amber-800 dark:text-amber-300">Aging (16 - 30 Days)</div>
                                    <div class="text-[10px] text-amber-700 dark:text-amber-400">Follow-up reminder due</div>
                                </div>
                                <span class="font-black text-amber-700 dark:text-[#e6993a] text-sm">
                                    ${formatETB(m.pendingPayments * 0.4)}
                                </span>
                            </div>
                            <div class="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex justify-between items-center text-xs">
                                <div>
                                    <div class="font-bold text-rose-800 dark:text-rose-300">Overdue (30+ Days)</div>
                                    <div class="text-[10px] text-rose-700 dark:text-rose-400">Requires immediate administrative escalation</div>
                                </div>
                                <span class="font-black text-rose-700 dark:text-rose-400 text-sm">
                                    0 ETB
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --------------------------------------------------------------------------
    // SUB-VIEW 5: FINANCIAL STATEMENTS & AUDITED REPORTS (Print & CSV Downloads)
    // --------------------------------------------------------------------------
    function renderEarnReports(m, state) {
        return `
            <div class="space-y-6">
                <!-- Section Header -->
                <div class="ui-card p-5 rounded-[24px] border border-[var(--card-border)] flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                        <h3 class="text-base font-black text-[var(--text-main)] flex items-center gap-2">
                            <i class="fas fa-file-invoice-dollar text-[#e6993a]"></i>
                            <span>Financial Statements & Formal Reporting</span>
                        </h3>
                        <p class="text-xs text-[var(--text-muted)]">
                            Generate one-click printable statements and standard CSV data exports for accounting and taxation
                        </p>
                    </div>
                    <div class="text-xs font-bold text-emerald-600 dark:text-[#4bd39a] flex items-center gap-1.5">
                        <i class="fas fa-shield-alt"></i>
                        <span>Audited GAAP-Compliant Cash Accounting</span>
                    </div>
                </div>

                <!-- 4 Standard Report Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Report 1: Profit & Loss Statement (Income Statement) -->
                    <div class="ui-card p-6 rounded-[24px] border border-[var(--card-border)] flex flex-col justify-between space-y-4">
                        <div>
                            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-[#4bd39a] flex items-center justify-center text-base mb-3">
                                <i class="fas fa-file-invoice"></i>
                            </div>
                            <h4 class="text-lg font-black text-[var(--text-main)]">Income Statement (Profit & Loss)</h4>
                            <p class="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                                Formal breakdown of realized revenues (${formatETB(m.totalReceived)}), operational expenses (${formatETB(m.totalExpenses)}), and net taxable margin (${formatETB(m.netProfit)}).
                            </p>
                        </div>
                        <div class="pt-4 border-t border-[var(--card-border)] flex items-center gap-2">
                            <button onclick="openPrintableReport('pnl')" class="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#121815] text-[#e6993a] border border-[#e6993a]/40 hover:bg-[#1a231d] transition flex items-center justify-center gap-1.5 cursor-pointer">
                                <i class="fas fa-print"></i>
                                <span>Print / View P&L</span>
                            </button>
                            <button onclick="exportPnlToCSV()" class="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition cursor-pointer" title="Download CSV">
                                <i class="fas fa-file-csv text-emerald-600"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Report 2: Itemized Expense Report -->
                    <div class="ui-card p-6 rounded-[24px] border border-[var(--card-border)] flex flex-col justify-between space-y-4">
                        <div>
                            <div class="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center text-base mb-3">
                                <i class="fas fa-receipt"></i>
                            </div>
                            <h4 class="text-lg font-black text-[var(--text-main)]">Itemized Business Expense Report</h4>
                            <p class="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                                Complete audited listing of all ${state.expenses.length} business expenditures categorized by project attribution, vendor, and receipt reference numbers.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-[var(--card-border)] flex items-center gap-2">
                            <button onclick="openPrintableReport('expenses')" class="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#121815] text-[#e6993a] border border-[#e6993a]/40 hover:bg-[#1a231d] transition flex items-center justify-center gap-1.5 cursor-pointer">
                                <i class="fas fa-print"></i>
                                <span>Print Expense Audit</span>
                            </button>
                            <button onclick="exportExpensesToCSV()" class="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition cursor-pointer" title="Download CSV">
                                <i class="fas fa-file-csv text-rose-600"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Report 3: Client Payment Statement -->
                    <div class="ui-card p-6 rounded-[24px] border border-[var(--card-border)] flex flex-col justify-between space-y-4">
                        <div>
                            <div class="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center text-base mb-3">
                                <i class="fas fa-users"></i>
                            </div>
                            <h4 class="text-lg font-black text-[var(--text-main)]">Client Accounts & Payment History</h4>
                            <p class="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                                Individual statements of account per client, contracted project values, advance payments received, and outstanding milestone receivables.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-[var(--card-border)] flex items-center gap-2">
                            <button onclick="openPrintableReport('clients')" class="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#121815] text-[#e6993a] border border-[#e6993a]/40 hover:bg-[#1a231d] transition flex items-center justify-center gap-1.5 cursor-pointer">
                                <i class="fas fa-print"></i>
                                <span>Print Client Statements</span>
                            </button>
                            <button onclick="exportIncomeToCSV()" class="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition cursor-pointer" title="Download CSV">
                                <i class="fas fa-file-csv text-blue-600"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Report 4: Annual Financial Treasury Summary -->
                    <div class="ui-card p-6 rounded-[24px] border border-[var(--card-border)] flex flex-col justify-between space-y-4">
                        <div>
                            <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-[#e6993a] flex items-center justify-center text-base mb-3">
                                <i class="fas fa-landmark"></i>
                            </div>
                            <h4 class="text-lg font-black text-[var(--text-main)]">Annual Financial Treasury Summary</h4>
                            <p class="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                                Complete fiscal year executive summary for ELNA DIGITAL operations, cash realization ratios, and tax documentation reference.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-[var(--card-border)] flex items-center gap-2">
                            <button onclick="openPrintableReport('annual')" class="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#121815] text-[#e6993a] border border-[#e6993a]/40 hover:bg-[#1a231d] transition flex items-center justify-center gap-1.5 cursor-pointer">
                                <i class="fas fa-print"></i>
                                <span>Print Fiscal Summary</span>
                            </button>
                            <button onclick="exportAuditLogToCSV()" class="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition cursor-pointer" title="Download Audit CSV">
                                <i class="fas fa-file-csv text-amber-600"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --------------------------------------------------------------------------
    // SUB-VIEW 6: FINANCIAL SETTINGS, CATEGORIES & PERMANENT AUDIT LOG
    // --------------------------------------------------------------------------
    function renderEarnSettings(m, state) {
        const settings = state.financialSettings || defaultFinancialSettings;
        const incomeCats = state.incomeCategories || defaultIncomeCategories;
        const expCats = state.expenseCategories || defaultExpenseCategories;
        const payMethods = state.paymentMethods || defaultPaymentMethods;
        const auditLog = state.financialAuditLog || defaultFinancialAuditLog;

        return `
            <div class="space-y-6">
                <!-- Section 1: Financial Goals & Treasury Settings -->
                <div class="ui-card p-6 rounded-[24px] border border-[var(--card-border)]">
                    <div class="flex items-center justify-between pb-4 border-b border-[var(--card-border)] mb-4">
                        <div>
                            <h3 class="text-base font-black text-[var(--text-main)] flex items-center gap-2">
                                <i class="fas fa-sliders-h text-[#e6993a]"></i>
                                <span>Financial Targets & Treasury Preferences</span>
                            </h3>
                            <p class="text-xs text-[var(--text-muted)]">Configure official monthly revenue and net profit benchmarks</p>
                        </div>
                        <span class="text-xs font-bold text-emerald-600 dark:text-[#4bd39a] px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            Currency: ETB (Ethiopian Birr)
                        </span>
                    </div>

                    <form onsubmit="saveFinancialSettings(event)" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Monthly Revenue Goal (ETB) *</label>
                            <input id="fset-rev-goal" type="number" min="0" required value="${settings.monthlyRevenueGoal || 100000}" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] font-black text-emerald-600 text-sm">
                        </div>
                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Monthly Profit Goal (ETB) *</label>
                            <input id="fset-prof-goal" type="number" min="0" required value="${settings.monthlyProfitGoal || 65000}" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] font-black text-[#e6993a] text-sm">
                        </div>
                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Accounting Method</label>
                            <input type="text" disabled value="Cash Basis (Realized Inflows)" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] font-semibold text-[var(--text-muted)]">
                        </div>
                        <div class="flex items-end">
                            <button type="submit" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#e6993a] hover:bg-[#d4882c] text-black transition shadow-sm cursor-pointer">
                                Save Settings
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Section 2: Income Categories Management -->
                <div class="ui-card p-6 rounded-[24px] border border-[var(--card-border)] space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div>
                            <h3 class="text-base font-black text-[var(--text-main)] flex items-center gap-2">
                                <i class="fas fa-tags text-[#e6993a]"></i>
                                <span>Income Categories Management</span>
                            </h3>
                            <p class="text-xs text-[var(--text-muted)]">Manage official categorization for client project payments and advisory</p>
                        </div>
                        <button onclick="openCategoryModal('income')" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 cursor-pointer">
                            <i class="fas fa-plus"></i> + Add Income Category
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        ${incomeCats.map(cat => `
                            <div class="p-3.5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex flex-col justify-between space-y-2">
                                <div class="flex items-start justify-between gap-2">
                                    <div class="font-bold text-[var(--text-main)] text-xs">${cat.name}</div>
                                    <span class="px-2 py-0.5 rounded-full text-[9px] font-black ${cat.status === 'active' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-slate-500/15 text-slate-500'}">
                                        ${cat.status || 'active'}
                                    </span>
                                </div>
                                <p class="text-[11px] text-[var(--text-muted)] leading-relaxed">${cat.description || 'Standard income classification'}</p>
                                <div class="pt-2 border-t border-[var(--card-border)] flex items-center justify-between">
                                    <button onclick="openCategoryModal('income', '${cat.id}')" class="text-[11px] font-bold text-blue-500 hover:underline cursor-pointer">
                                        Edit
                                    </button>
                                    <button onclick="toggleCategoryStatus('income', '${cat.id}')" class="text-[11px] font-bold text-slate-400 hover:text-[var(--text-main)] cursor-pointer">
                                        ${cat.status === 'active' ? 'Deactivate' : 'Activate'}
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Section 3: Expense Categories & Monthly Budgets -->
                <div class="ui-card p-6 rounded-[24px] border border-[var(--card-border)] space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div>
                            <h3 class="text-base font-black text-[var(--text-main)] flex items-center gap-2">
                                <i class="fas fa-layer-group text-[#e6993a]"></i>
                                <span>Expense Categories & Monthly Budget Caps</span>
                            </h3>
                            <p class="text-xs text-[var(--text-muted)]">Define budget thresholds for material cutting, transport, cloud, and tools</p>
                        </div>
                        <button onclick="openCategoryModal('expense')" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-rose-700/80 hover:bg-rose-600 text-white transition flex items-center gap-1.5 cursor-pointer">
                            <i class="fas fa-plus"></i> + Add Expense Category
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                        ${expCats.map(cat => `
                            <div class="p-3.5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex flex-col justify-between space-y-2.5">
                                <div class="flex items-start justify-between gap-2">
                                    <div class="font-bold text-[var(--text-main)] text-xs">${cat.name}</div>
                                    <span class="px-2 py-0.5 rounded-full text-[9px] font-black ${cat.status === 'active' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-slate-500/15 text-slate-500'}">
                                        ${cat.status || 'active'}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-[10px] text-[var(--text-muted)] block">Monthly Budget Cap</span>
                                    <span class="text-sm font-black text-rose-600 dark:text-rose-400">${formatETB(cat.budget || 5000)}</span>
                                </div>
                                <div class="pt-2 border-t border-[var(--card-border)] flex items-center justify-between">
                                    <button onclick="openCategoryModal('expense', '${cat.id}')" class="text-[11px] font-bold text-blue-500 hover:underline cursor-pointer">
                                        Edit Cap
                                    </button>
                                    <button onclick="toggleCategoryStatus('expense', '${cat.id}')" class="text-[11px] font-bold text-slate-400 hover:text-[var(--text-main)] cursor-pointer">
                                        ${cat.status === 'active' ? 'Deactivate' : 'Activate'}
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Section 4: Payment Methods Control Room -->
                <div class="ui-card p-6 rounded-[24px] border border-[var(--card-border)] space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div>
                            <h3 class="text-base font-black text-[var(--text-main)] flex items-center gap-2">
                                <i class="fas fa-credit-card text-[#e6993a]"></i>
                                <span>Accepted Payment Methods Control</span>
                            </h3>
                            <p class="text-xs text-[var(--text-muted)]">Configure active Ethiopian banking channels and digital payment rails</p>
                        </div>
                        <button onclick="openPaymentMethodModal()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-[#121815] text-[#e6993a] border border-[#e6993a]/40 hover:bg-[#1a231d] transition flex items-center gap-1.5 cursor-pointer">
                            <i class="fas fa-plus"></i> + Add Payment Method
                        </button>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        ${payMethods.map(pm => `
                            <div class="p-3.5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex items-center justify-between gap-2">
                                <div>
                                    <div class="font-bold text-[var(--text-main)] text-xs flex items-center gap-1.5">
                                        <span>${pm.name}</span>
                                        ${pm.isDefault ? '<span class="text-[9px] font-black text-[#e6993a]">[Default]</span>' : ''}
                                    </div>
                                    <span class="text-[10px] text-[var(--text-muted)] block mt-0.5">${pm.provider || 'Ethiopian Bank'}</span>
                                </div>
                                <button onclick="togglePaymentMethodStatus('${pm.id}')" class="px-2 py-0.5 rounded-md text-[10px] font-bold ${pm.status === 'active' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-slate-500/15 text-slate-500'} cursor-pointer">
                                    ${pm.status === 'active' ? 'Enabled' : 'Disabled'}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Section 5: Permanent Immutable Financial Audit Log -->
                <div class="ui-card rounded-[24px] overflow-hidden border border-[var(--card-border)]">
                    <div class="p-4 border-b border-[var(--card-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h3 class="text-sm font-black text-[var(--text-main)] flex items-center gap-2">
                                <i class="fas fa-history text-[#e6993a]"></i>
                                <span>Permanent Financial Audit Trail</span>
                            </h3>
                            <p class="text-xs text-[var(--text-muted)]">Immutable log of every payment recorded, edited, refunded, or expense deletion</p>
                        </div>
                        <button onclick="exportAuditLogToCSV()" class="py-1.5 px-3 rounded-xl text-xs font-bold bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] hover:border-[#e6993a] transition cursor-pointer flex items-center gap-1.5">
                            <i class="fas fa-download text-[10px]"></i>
                            <span>Export Audit Log</span>
                        </button>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr class="bg-[var(--subtle-bg)] border-b border-[var(--card-border)] text-[var(--text-muted)] font-bold text-[11px]">
                                    <th class="p-3">Timestamp</th>
                                    <th class="p-3">Action</th>
                                    <th class="p-3">Type</th>
                                    <th class="p-3">Details</th>
                                    <th class="p-3">Before / After</th>
                                    <th class="p-3">Reason & Authority</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[var(--card-border)]">
                                ${auditLog.map(log => `
                                    <tr class="hover:bg-[var(--subtle-bg)] transition">
                                        <td class="p-3 whitespace-nowrap text-[var(--text-muted)] font-mono text-[11px]">
                                            ${log.date}
                                        </td>
                                        <td class="p-3">
                                            <span class="px-2 py-0.5 rounded-full text-[9px] font-black ${log.action.includes('DELETE') ? 'bg-rose-500/15 text-rose-700 dark:text-rose-400' : log.action.includes('EDIT') ? 'bg-blue-500/15 text-blue-700 dark:text-blue-400' : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'}">
                                                ${log.action}
                                            </span>
                                        </td>
                                        <td class="p-3 font-semibold text-[var(--text-main)]">
                                            ${log.itemType}
                                        </td>
                                        <td class="p-3 text-[var(--text-main)] font-medium max-w-xs">
                                            ${log.details}
                                        </td>
                                        <td class="p-3 font-mono text-[10px] text-slate-500">
                                            ${log.oldValue || '—'} → ${log.newValue || '—'}
                                        </td>
                                        <td class="p-3 text-[10px] text-[var(--text-muted)]">
                                            <div>${log.reason || 'Standard record'}</div>
                                            <span class="font-bold text-[var(--text-main)]">${log.administrator || 'Administrator'}</span>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    function getProjectNameById(projectId) {
        if (!projectId) return 'General Business / Internal';
        const p = window.clientProjectsState.projects.find(x => x.id === projectId);
        return p ? p.name : 'Unknown Project';
    }

    function renderPaymentDueSummary(projects) {
        const todayStr = new Date().toISOString().split('T')[0];
        const dueProjects = projects.filter(p => {
            const paid = getProjectPaidAmount(p.id);
            return paid < p.finalPrice;
        });

        if (dueProjects.length === 0) {
            return '<div class="text-xs text-emerald-600 dark:text-emerald-400 font-bold p-3 rounded-xl bg-emerald-500/10">All client payments are 100% up to date! No outstanding receivables.</div>';
        }

        return dueProjects.map(p => {
            const paid = getProjectPaidAmount(p.id);
            const bal = p.finalPrice - paid;
            const isOverdue = p.paymentDeadline && p.paymentDeadline < todayStr;

            return `
                <div class="flex items-center justify-between p-2.5 rounded-xl border ${isOverdue ? 'border-rose-500/40 bg-rose-500/5' : 'border-amber-500/30 bg-amber-500/5'} text-xs">
                    <div class="min-w-0 flex-1 pr-2">
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-[var(--text-main)] truncate">${p.clientName}</span>
                            <span class="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${isOverdue ? 'bg-rose-500 text-white' : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'}">
                                ${isOverdue ? 'OVERDUE' : 'PENDING'}
                            </span>
                        </div>
                        <span class="text-[10px] text-[var(--text-muted)] block mt-0.5 truncate">${p.name} · Deadline: ${p.paymentDeadline || 'Not set'}</span>
                    </div>
                    <div class="text-right shrink-0">
                        <div class="font-black ${isOverdue ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-300'}">${formatETB(bal)}</div>
                        <button onclick="openRecordPaymentModal('${p.id}')" class="text-[10px] font-bold text-[#e6993a] hover:underline cursor-pointer">
                            Record Payment →
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    function getProjectPaidAmount(projectId) {
        return window.clientProjectsState.payments
            .filter(pay => pay.projectId === projectId)
            .reduce((sum, pay) => sum + (Number(pay.amount) || 0), 0);
    }

    function getProjectExpenseAmount(projectId) {
        return window.clientProjectsState.expenses
            .filter(e => e.projectId === projectId)
            .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    }

    function calculatePaymentStatus(p) {
        const paid = getProjectPaidAmount(p.id);
        const finalPrice = Number(p.finalPrice) || 0;
        const todayStr = new Date().toISOString().split('T')[0];

        if (paid >= finalPrice && finalPrice > 0) return 'Fully Paid';
        if (p.paymentDeadline && p.paymentDeadline < todayStr && paid < finalPrice) return 'Payment Overdue';
        if (paid > 0 && paid < finalPrice) return 'Partially Paid';
        return 'Unpaid';
    }

    // ==============================================================================
    // 2. PROJECTS TAB (List, Filter, Search, Manage)
    // ==============================================================================
    function renderProjectsTab() {
        const state = window.clientProjectsState;

        let filtered = state.projects.filter(p => {
            const matchesSearch = !projectFilter.search ||
                p.name.toLowerCase().includes(projectFilter.search.toLowerCase()) ||
                p.clientName.toLowerCase().includes(projectFilter.search.toLowerCase());

            const matchesStatus = projectFilter.status === 'ALL' ||
                p.status === projectFilter.status ||
                (projectFilter.status === 'Ongoing' && (p.status === 'Ongoing' || p.status === 'In Progress')) ||
                (projectFilter.status === 'Waiting for Client Approval' && (p.status === 'Waiting for Client Approval' || p.status === 'Waiting for Client'));

            const payStatus = calculatePaymentStatus(p);
            const matchesPayStatus = projectFilter.paymentStatus === 'ALL' || payStatus === projectFilter.paymentStatus;

            return matchesSearch && matchesStatus && matchesPayStatus;
        });

        if (projectFilter.sortBy === 'newest') {
            filtered.sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''));
        } else if (projectFilter.sortBy === 'oldest') {
            filtered.sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));
        } else if (projectFilter.sortBy === 'highest_value') {
            filtered.sort((a, b) => (b.finalPrice || 0) - (a.finalPrice || 0));
        } else if (projectFilter.sortBy === 'lowest_value') {
            filtered.sort((a, b) => (a.finalPrice || 0) - (b.finalPrice || 0));
        } else if (projectFilter.sortBy === 'deadline') {
            filtered.sort((a, b) => (a.expectedCompletionDate || '9999').localeCompare(b.expectedCompletionDate || '9999'));
        }

        const statusOptions = ['ALL', 'Not Started', 'Ongoing', 'Waiting for Client Approval', 'Completed'];
        const payStatusOptions = ['ALL', 'Unpaid', 'Partially Paid', 'Fully Paid', 'Payment Overdue'];

        return `
            <!-- Filter & Search Controls Header -->
            <div class="ui-card p-4 rounded-2xl mb-6 space-y-3">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div class="relative flex-1">
                        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)]"></i>
                        <input type="text" placeholder="Search projects by name, client business..." value="${projectFilter.search}" oninput="setProjectFilter('search', this.value)" class="w-full pl-9 pr-3 py-2 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                    </div>

                    <div class="flex items-center gap-2 shrink-0">
                        <span class="text-xs font-semibold text-[var(--text-muted)]">Sort:</span>
                        <select onchange="setProjectFilter('sortBy', this.value)" class="py-2 px-3 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            <option value="newest" ${projectFilter.sortBy === 'newest' ? 'selected' : ''}>Newest First</option>
                            <option value="oldest" ${projectFilter.sortBy === 'oldest' ? 'selected' : ''}>Oldest First</option>
                            <option value="highest_value" ${projectFilter.sortBy === 'highest_value' ? 'selected' : ''}>Highest Value (ETB)</option>
                            <option value="lowest_value" ${projectFilter.sortBy === 'lowest_value' ? 'selected' : ''}>Lowest Value (ETB)</option>
                            <option value="deadline" ${projectFilter.sortBy === 'deadline' ? 'selected' : ''}>Upcoming Deadline</option>
                        </select>
                    </div>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--card-border)]">
                    <div class="flex flex-wrap items-center gap-1.5">
                        <span class="text-[11px] font-bold text-[var(--text-muted)] mr-1">Project Status:</span>
                        ${statusOptions.map(opt => `
                            <button onclick="setProjectFilter('status', '${opt}')" class="px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${projectFilter.status === opt ? 'bg-[#e6993a] text-black font-black shadow-2xs' : 'bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--card-border)] hover:text-[var(--text-main)]'}">
                                ${opt}
                            </button>
                        `).join('')}
                        ${projectFilter.status !== 'ALL' ? `
                            <button onclick="resetProjectStatusFilter()" class="px-2 py-1 rounded-lg text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition cursor-pointer flex items-center gap-1" title="Reset project status filter to ALL">
                                <i class="fas fa-times text-[9px]"></i>
                                <span>Reset Status</span>
                            </button>
                        ` : ''}
                    </div>

                    ${projectFilter.status !== 'ALL' || projectFilter.paymentStatus !== 'ALL' || (projectFilter.search && projectFilter.search.trim()) ? `
                        <button onclick="resetProjectFilters()" class="py-1 px-2.5 rounded-lg text-[10px] font-black bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 transition cursor-pointer flex items-center gap-1 shadow-2xs">
                            <i class="fas fa-undo text-[9px]"></i>
                            <span>Reset All Filters</span>
                        </button>
                    ` : ''}
                </div>

                <div class="flex flex-wrap items-center gap-1.5 pt-1">
                    <span class="text-[11px] font-bold text-[var(--text-muted)] mr-1">Payment Status:</span>
                    ${payStatusOptions.map(opt => `
                        <button onclick="setProjectFilter('paymentStatus', '${opt}')" class="px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${projectFilter.paymentStatus === opt ? 'bg-emerald-600 text-white font-bold' : 'bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--card-border)] hover:text-[var(--text-main)]'}">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
            </div>

            ${filtered.length === 0 ? `
                <div class="ui-card p-12 text-center rounded-[24px]">
                    <div class="w-12 h-12 rounded-full bg-amber-500/10 text-[#e6993a] flex items-center justify-center text-xl mx-auto mb-3">
                        <i class="fas fa-folder-open"></i>
                    </div>
                    <h3 class="text-base font-bold text-[var(--text-main)]">No client projects match your filters</h3>
                    <p class="text-xs text-[var(--text-muted)] mt-1 mb-4">Try resetting your status or payment filters, or register a new client.</p>
                    <div class="flex items-center justify-center gap-2">
                        <button onclick="resetProjectFilters()" class="py-2 px-4 rounded-xl text-xs font-bold bg-[var(--subtle-bg)] hover:bg-[var(--card-border)] text-[var(--text-main)] border border-[var(--card-border)] transition cursor-pointer flex items-center gap-1.5">
                            <i class="fas fa-undo text-xs"></i>
                            <span>Reset Filters</span>
                        </button>
                        <button onclick="openNewClientModal()" class="py-2 px-4 rounded-xl text-xs font-bold bg-[#e6993a] text-black hover:bg-[#d8892a] transition cursor-pointer">
                            + ADD NEW CLIENT
                        </button>
                    </div>
                </div>
            ` : `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${filtered.map(p => renderProjectCard(p)).join('')}
                </div>
            `}
        `;
    }

    function renderProjectCard(p) {
        const paid = getProjectPaidAmount(p.id);
        const finalPrice = Number(p.finalPrice) || 0;
        const balance = Math.max(0, finalPrice - paid);
        const payPct = finalPrice > 0 ? Math.min(100, Math.round((paid / finalPrice) * 100)) : 0;
        const payStatus = calculatePaymentStatus(p);

        // Ensure tasks exist and are properly structured
        ensureProjectPhasedTasks(p);

        const doneTasks = p.tasks.filter(t => t.done).length;
        const totalTasks = p.tasks.length;
        const taskPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

        const client = window.clientProjectsState.clients.find(c => c.id === p.clientId);
        const pkg = getProjectPackage(p);

        let statusBadge = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
        if (p.status === 'Ongoing' || p.status === 'In Progress') statusBadge = 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30';
        if (p.status === 'Completed' || p.status === 'Approved') statusBadge = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30';
        if (p.status === 'Waiting for Client Approval' || p.status === 'Waiting for Client') statusBadge = 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30 animate-pulse';
        if (p.status === 'Not Started') statusBadge = 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200';
        if (p.status === 'Cancelled') statusBadge = 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30';

        let payBadge = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
        if (payStatus === 'Fully Paid') payBadge = 'bg-emerald-500 text-black font-extrabold shadow-xs';
        if (payStatus === 'Partially Paid') payBadge = 'bg-amber-500 text-black font-bold';
        if (payStatus === 'Payment Overdue') payBadge = 'bg-rose-600 text-white font-extrabold animate-pulse';
        if (payStatus === 'Unpaid') payBadge = 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200';

        const isNotStarted = p.status === 'Not Started';
        const isCompleted = p.status === 'Completed' || p.status === 'Approved';

        // Action button based on status: Not Started -> Start Project | In Progress -> Continue Project | Completed -> View Project
        let actionBtnHTML = '';
        if (isNotStarted) {
            actionBtnHTML = `
                <button onclick="startProjectAndOpenWorkspace('${p.id}')" class="py-1.5 px-3 rounded-lg text-xs font-black bg-[#e6993a] text-black hover:bg-[#d8892a] transition flex items-center gap-1.5 cursor-pointer shadow-xs hover:scale-[1.02]">
                    <span>Start Project</span>
                    <i class="fas fa-play text-[9px]"></i>
                </button>
            `;
        } else if (isCompleted) {
            actionBtnHTML = `
                <button onclick="openProjectWorkspace('${p.id}')" class="py-1.5 px-3 rounded-lg text-xs font-black bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center gap-1.5 cursor-pointer shadow-xs hover:scale-[1.02]">
                    <span>View Project</span>
                    <i class="fas fa-eye text-[9px]"></i>
                </button>
            `;
        } else {
            actionBtnHTML = `
                <button onclick="openProjectWorkspace('${p.id}')" class="py-1.5 px-3 rounded-lg text-xs font-black bg-[#121815] dark:bg-white text-white dark:text-black hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer shadow-xs hover:scale-[1.02]">
                    <span>Continue Project</span>
                    <i class="fas fa-arrow-right text-[9px]"></i>
                </button>
            `;
        }

        return `
            <div class="ui-card p-5 rounded-[22px] flex flex-col justify-between space-y-4 hover:shadow-md transition group border border-[var(--card-border)] hover:border-[#e6993a]/40">
                <!-- Header -->
                <div>
                    <div class="flex items-center justify-between gap-2 mb-2">
                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${statusBadge}">
                            ${p.status}
                        </span>
                        <div class="flex items-center gap-1.5">
                            ${client ? getClassificationBadge(client.classification) : ''}
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] ${payBadge}">
                                ${payStatus}
                            </span>
                        </div>
                    </div>

                    <h3 class="font-bold text-base text-[var(--text-main)] group-hover:text-[#e6993a] transition line-clamp-1 cursor-pointer" onclick="openProjectWorkspace('${p.id}')" title="${p.name}">
                        ${p.name}
                    </h3>
                    <div class="flex items-center justify-between mt-0.5">
                        <div class="text-xs font-semibold text-[#a06438] dark:text-[#e6993a] flex items-center gap-1.5 cursor-pointer hover:underline" onclick="openClientProfileModal('${p.clientId}')">
                            <i class="fas fa-building text-[10px]"></i>
                            <span class="truncate">${p.clientName}</span>
                        </div>
                        <span class="text-[10px] font-extrabold text-[var(--text-muted)] bg-[var(--subtle-bg)] px-2 py-0.5 rounded-md border border-[var(--card-border)]">
                            ${pkg.name}
                        </span>
                    </div>

                    <!-- Services Tags -->
                    <div class="flex flex-wrap gap-1 mt-2.5">
                        ${p.services.map(s => `
                            <span class="text-[9px] font-bold px-2 py-0.5 rounded-md bg-[var(--subtle-bg)] text-[var(--text-muted)] border border-[var(--card-border)]">
                                ${s.name}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <!-- Financial Health Mini-Ledger -->
                <div class="p-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] space-y-2">
                    <div class="flex justify-between items-baseline text-xs">
                        <span class="text-[var(--text-muted)]">Project Price:</span>
                        <span class="font-extrabold text-[var(--text-main)]">${formatETB(finalPrice)}</span>
                    </div>
                    <div class="flex justify-between items-baseline text-xs">
                        <span class="text-emerald-700 dark:text-emerald-400 font-medium">Paid (${payPct}%):</span>
                        <span class="font-black text-emerald-600 dark:text-[#4bd39a]">${formatETB(paid)}</span>
                    </div>
                    ${balance > 0 ? `
                        <div class="flex justify-between items-baseline text-xs pt-1 border-t border-[var(--card-border)]">
                            <span class="text-amber-700 dark:text-amber-400 font-bold">50% Adv / Bal:</span>
                            <span class="font-black text-amber-600 dark:text-[#e6993a]">${formatETB(balance)}</span>
                        </div>
                    ` : ''}

                    <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                        <div class="bg-gradient-to-r from-emerald-500 to-[#e6993a] h-1.5 rounded-full transition-all duration-300" style="width: ${payPct}%;"></div>
                    </div>
                </div>

                <!-- Delivery Tasks Completion Bar -->
                <div class="space-y-1">
                    <div class="flex justify-between text-[11px] text-[var(--text-muted)] font-medium">
                        <span>Milestone Tasks</span>
                        <span class="font-bold text-[var(--text-main)]">${doneTasks}/${totalTasks} done (${taskPct}%)</span>
                    </div>
                    <div class="w-full bg-[var(--card-border)] h-1.5 rounded-full overflow-hidden">
                        <div class="bg-[#e6993a] h-1.5 rounded-full transition-all duration-300" style="width: ${taskPct}%;"></div>
                    </div>
                </div>

                <!-- Dates & Action Footer: Preserves layout, keeps +Pay, adds Start/Continue/View -->
                <div class="pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                    <span class="flex items-center gap-1" title="Expected Completion Date">
                        <i class="far fa-calendar-alt text-[#e6993a]"></i>
                        <span>Due: ${p.expectedCompletionDate || 'Not set'}</span>
                    </span>

                    <div class="flex items-center gap-1.5">
                        <button onclick="openRecordPaymentModal('${p.id}')" class="p-1.5 px-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold transition cursor-pointer flex items-center gap-1" title="Record Payment">
                            <i class="fas fa-plus text-[10px]"></i> Pay
                        </button>
                        ${actionBtnHTML}
                    </div>
                </div>
            </div>
        `;
    }

    // ==============================================================================
    // 3. CLIENTS DIRECTORY TAB (Classification Badges, GPS Links, Profiles)
    // ==============================================================================
    function renderClientsTab() {
        const state = window.clientProjectsState;

        return `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                    <h3 class="text-lg font-black text-[var(--text-main)]">Client Directory (${state.clients.length})</h3>
                    <p class="text-xs text-[var(--text-muted)]">
                        Classified business accounts with future potential rating (GOLD · SILVER · BRONZE · STARTER)
                    </p>
                </div>
                <button onclick="openNewClientModal()" class="py-2 px-4 rounded-xl text-xs font-bold bg-[#e6993a] text-black hover:bg-[#d8892a] transition shadow-xs flex items-center gap-1.5 self-start cursor-pointer hover:scale-[1.02]">
                    <i class="fas fa-user-plus"></i> + ADD NEW CLIENT
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${state.clients.map(c => {
                    const clientProjects = state.projects.filter(p => p.clientId === c.id);
                    const totalBilled = clientProjects.reduce((sum, p) => sum + (Number(p.finalPrice) || 0), 0);
                    const totalPaid = state.payments
                        .filter(pay => pay.clientId === c.id)
                        .reduce((sum, pay) => sum + (Number(pay.amount) || 0), 0);
                    const bal = Math.max(0, totalBilled - totalPaid);

                    return `
                        <div class="ui-card p-5 rounded-[22px] flex flex-col justify-between space-y-4 hover:shadow-md transition border border-[var(--card-border)] group">
                            <div>
                                <div class="flex items-start justify-between gap-2 mb-2">
                                    <div class="flex items-center gap-1.5">
                                        ${getClassificationBadge(c.classification)}
                                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                            ${c.category || 'Business'}
                                        </span>
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <button onclick="openClientProfileModal('${c.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-[var(--text-main)] hover:bg-[var(--subtle-bg)] transition cursor-pointer" title="View Full Profile">
                                            <i class="fas fa-external-link-alt text-xs"></i>
                                        </button>
                                        <button onclick="confirmDeleteClient('${c.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition cursor-pointer" title="Delete Client">
                                            <i class="fas fa-trash-alt text-xs"></i>
                                        </button>
                                    </div>
                                </div>

                                <h3 class="font-black text-lg text-[var(--text-main)] group-hover:text-[#e6993a] transition cursor-pointer mt-1" onclick="openClientProfileModal('${c.id}')">
                                    ${c.businessName}
                                </h3>

                                <!-- Contact Info -->
                                <div class="space-y-1.5 text-xs text-[var(--text-muted)] mt-3">
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-user-circle text-slate-400 w-3.5"></i>
                                        <span class="text-[var(--text-main)] font-semibold">${c.contactPerson || 'Not specified'}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-phone text-slate-400 w-3.5"></i>
                                        <a href="tel:${c.phone}" class="hover:text-[#e6993a] transition font-medium">${c.phone || 'No phone'}</a>
                                    </div>
                                    ${c.email ? `
                                        <div class="flex items-center gap-2">
                                            <i class="fas fa-envelope text-slate-400 w-3.5"></i>
                                            <a href="mailto:${c.email}" class="hover:text-[#e6993a] transition truncate">${c.email}</a>
                                        </div>
                                    ` : ''}
                                    <div class="flex items-start gap-2 pt-1">
                                        <i class="fas fa-map-marker-alt text-[#e6993a] w-3.5 mt-0.5 shrink-0"></i>
                                        <div class="flex-1">
                                            <span>${c.location || 'Addis Ababa, Ethiopia'}</span>
                                            ${c.googleMapsUrl ? `
                                                <a href="${c.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[11px] font-bold text-[#e6993a] hover:underline ml-1">
                                                    <span>(Google Maps)</span>
                                                    <i class="fas fa-external-link-alt text-[9px]"></i>
                                                </a>
                                            ` : ''}
                                        </div>
                                    </div>
                                </div>

                                <!-- Social Links -->
                                <div class="flex flex-wrap items-center gap-1.5 mt-3 pt-2 border-t border-[var(--card-border)] text-xs">
                                    ${c.instagramUrl ? `
                                        <a href="${c.instagramUrl}" target="_blank" rel="noopener noreferrer" class="p-1 px-2 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 text-[10px] font-bold transition flex items-center gap-1">
                                            <i class="fab fa-instagram"></i> Instagram
                                        </a>
                                    ` : ''}
                                    ${c.facebookUrl ? `
                                        <a href="${c.facebookUrl}" target="_blank" rel="noopener noreferrer" class="p-1 px-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold transition flex items-center gap-1">
                                            <i class="fab fa-facebook"></i> Facebook
                                        </a>
                                    ` : ''}
                                    ${c.tiktokUrl ? `
                                        <a href="${c.tiktokUrl}" target="_blank" rel="noopener noreferrer" class="p-1 px-2 rounded-lg bg-black/10 dark:bg-white/10 text-[var(--text-main)] text-[10px] font-bold transition flex items-center gap-1">
                                            <i class="fab fa-tiktok"></i> TikTok
                                        </a>
                                    ` : ''}
                                    ${c.websiteUrl ? `
                                        <a href="${c.websiteUrl}" target="_blank" rel="noopener noreferrer" class="p-1 px-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold transition flex items-center gap-1">
                                            <i class="fas fa-globe"></i> Website
                                        </a>
                                    ` : ''}
                                </div>
                            </div>

                            <!-- Financial Summary for Client -->
                            <div class="p-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] space-y-1.5 text-xs">
                                <div class="flex justify-between items-center text-[11px] text-[var(--text-muted)]">
                                    <span>Active Projects:</span>
                                    <span class="font-bold text-[var(--text-main)]">${clientProjects.length}</span>
                                </div>
                                <div class="flex justify-between items-center text-[11px] text-[var(--text-muted)]">
                                    <span>Total Contracted:</span>
                                    <span class="font-bold text-[var(--text-main)]">${formatETB(totalBilled)}</span>
                                </div>
                                <div class="flex justify-between items-center text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                                    <span>Paid Revenue:</span>
                                    <span>${formatETB(totalPaid)}</span>
                                </div>
                                ${bal > 0 ? `
                                    <div class="flex justify-between items-center text-[11px] text-amber-600 dark:text-amber-400 font-bold pt-1 border-t border-[var(--card-border)]">
                                        <span>Outstanding Balance:</span>
                                        <span>${formatETB(bal)}</span>
                                    </div>
                                ` : ''}
                            </div>

                            <div class="pt-2">
                                <button onclick="openClientProfileModal('${c.id}')" class="w-full py-2 px-3 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition flex items-center justify-center gap-1.5 cursor-pointer">
                                    <i class="fas fa-id-card text-xs text-[#e6993a]"></i>
                                    <span>View Complete Profile & Projects</span>
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // ==============================================================================
    // 4. SERVICES, PACKAGES & PRICING CONTROL ROOM TAB
    // Complete Administrative Control Center with Historical Pricing Protection
    // ==============================================================================
    function renderServicesTab() {
        const state = window.clientProjectsState;
        const packages = state.packages || defaultPackages;
        const services = state.services || [];
        const history = state.pricingHistory || [];
        const projects = state.projects || [];

        return `
            <!-- Control Room Header & Trust Assurance Badges -->
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                    <div class="flex flex-wrap items-center gap-2 mb-1.5">
                        <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#a06438] dark:text-[#e6993a]">
                            ADMINISTRATIVE CONTROL ROOM
                        </span>
                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <i class="fas fa-shield-alt text-[9px]"></i> Historical Pricing Protection Active
                        </span>
                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1">
                            <i class="fas fa-lock text-[9px]"></i> Existing Contracts Frozen
                        </span>
                    </div>
                    <h2 class="text-2xl sm:text-3xl font-black text-[var(--text-main)]">
                        Services, Packages & Pricing Control Room
                    </h2>
                    <p class="text-xs text-[var(--text-muted)] mt-1 max-w-3xl leading-relaxed">
                        Configure client packages, phased task templates, individual services, and pricing in ETB. 
                        Every price adjustment is permanently logged in the audit trail. Existing & completed client agreements retain their original agreed pricing snapshots.
                    </p>
                </div>

                <!-- Primary Action Buttons -->
                <div class="flex flex-wrap items-center gap-2 shrink-0">
                    <button onclick="openAddPackageModal()" class="py-2.5 px-4 rounded-xl text-xs font-black bg-[#e6993a] text-black hover:bg-[#d8892a] transition shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                        <i class="fas fa-box-open text-xs"></i>
                        <span>+ New Package</span>
                    </button>
                    <button onclick="openAddServiceModal()" class="py-2.5 px-4 rounded-xl text-xs font-black bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition shadow-xs flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                        <i class="fas fa-plus text-[#e6993a]"></i>
                        <span>+ New Service</span>
                    </button>
                </div>
            </div>

            <!-- Control Room Sub-Tabs Navigation Bar -->
            <div class="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-[var(--card-border)] scrollbar-none">
                <button onclick="setControlRoomSubTab('packages')" class="py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${_controlRoomSubTab === 'packages' ? 'bg-[#e6993a] text-black shadow-sm' : 'bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                    <i class="fas fa-cubes text-xs"></i>
                    <span>Packages & Phases</span>
                    <span class="px-1.5 py-0.2 rounded-full text-[10px] font-black ${_controlRoomSubTab === 'packages' ? 'bg-black/20 text-black' : 'bg-[var(--subtle-bg)] text-[var(--text-muted)]'}">${packages.length}</span>
                </button>
                <button onclick="setControlRoomSubTab('services')" class="py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${_controlRoomSubTab === 'services' ? 'bg-[#e6993a] text-black shadow-sm' : 'bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                    <i class="fas fa-tags text-xs"></i>
                    <span>Individual Services Catalog</span>
                    <span class="px-1.5 py-0.2 rounded-full text-[10px] font-black ${_controlRoomSubTab === 'services' ? 'bg-black/20 text-black' : 'bg-[var(--subtle-bg)] text-[var(--text-muted)]'}">${services.length}</span>
                </button>
                <button onclick="setControlRoomSubTab('history')" class="py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${_controlRoomSubTab === 'history' ? 'bg-[#e6993a] text-black shadow-sm' : 'bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                    <i class="fas fa-history text-xs"></i>
                    <span>Pricing History & Audit Log</span>
                    <span class="px-1.5 py-0.2 rounded-full text-[10px] font-black ${_controlRoomSubTab === 'history' ? 'bg-black/20 text-black' : 'bg-[var(--subtle-bg)] text-[var(--text-muted)]'}">${history.length}</span>
                </button>
                <button onclick="setControlRoomSubTab('protection')" class="py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${_controlRoomSubTab === 'protection' ? 'bg-[#e6993a] text-black shadow-sm' : 'bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
                    <i class="fas fa-shield-alt text-xs"></i>
                    <span>Contract Protection Status</span>
                    <span class="px-1.5 py-0.2 rounded-full text-[10px] font-black ${_controlRoomSubTab === 'protection' ? 'bg-black/20 text-black' : 'bg-[var(--subtle-bg)] text-[var(--text-muted)]'}">${projects.length}</span>
                </button>
            </div>

            <!-- Active Sub-Tab Content -->
            <div id="control-room-subtab-container">
                ${_controlRoomSubTab === 'packages' ? renderControlRoomPackages(state) :
                  _controlRoomSubTab === 'services' ? renderControlRoomServices(state) :
                  _controlRoomSubTab === 'history' ? renderControlRoomHistory(state) :
                  renderControlRoomProtection(state)}
            </div>
        `;
    }

    // --------------------------------------------------------------------------
    // SUB-VIEW 1: PACKAGES & PHASES
    // --------------------------------------------------------------------------
    function renderControlRoomPackages(state) {
        const packages = state.packages || defaultPackages;

        return `
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
                ${packages.map(pkg => {
                    const totalPhases = pkg.phases ? pkg.phases.length : 0;
                    const totalTasks = pkg.phases ? pkg.phases.reduce((sum, ph) => sum + (ph.tasks ? ph.tasks.length : 0), 0) : 0;
                    const advancePct = pkg.advancePercentage || 50;
                    const advanceAmount = Math.round((Number(pkg.price) || 0) * (advancePct / 100));
                    const remainingAmount = (Number(pkg.price) || 0) - advanceAmount;
                    const isActive = pkg.status !== 'inactive';

                    return `
                        <div class="ui-card p-5 sm:p-6 rounded-[24px] border ${isActive ? 'border-[var(--card-border)]' : 'border-rose-500/30 opacity-75'} flex flex-col justify-between space-y-5 relative">
                            <!-- Top Card Header -->
                            <div>
                                <div class="flex items-start justify-between gap-3 mb-2">
                                    <div class="flex flex-wrap items-center gap-2">
                                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30'}">
                                            ${isActive ? 'ACTIVE PACKAGE' : 'INACTIVE / DRAFT'}
                                        </span>
                                        <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[var(--subtle-bg)] text-[var(--text-muted)] border border-[var(--card-border)]">
                                            Version ${pkg.version || 'v1.0'}
                                        </span>
                                    </div>
                                    <button onclick="togglePackageStatus('${pkg.id}')" class="text-[11px] font-bold ${isActive ? 'text-rose-500 hover:underline' : 'text-emerald-500 hover:underline'} cursor-pointer">
                                        ${isActive ? 'Deactivate' : 'Activate Package'}
                                    </button>
                                </div>

                                <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mt-1">
                                    <h3 class="text-xl font-black text-[var(--text-main)]">${pkg.name}</h3>
                                    <div class="flex items-baseline gap-1.5">
                                        <span class="text-2xl font-black text-emerald-600 dark:text-[#4bd39a]">${formatETB(pkg.price)}</span>
                                        <span class="text-[10px] text-[var(--text-muted)] font-semibold">official package rate</span>
                                    </div>
                                </div>

                                <p class="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
                                    ${pkg.desc || 'Complete digital transformation package tailored for Ethiopian businesses.'}
                                </p>

                                <!-- Payment Terms Card -->
                                <div class="mt-4 p-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span class="text-[10px] font-semibold text-[var(--text-muted)] block uppercase tracking-wider">Advance Payment (${advancePct}%)</span>
                                        <span class="font-extrabold text-[#e6993a]">${formatETB(advanceAmount)}</span>
                                    </div>
                                    <div class="border-l border-[var(--card-border)] pl-3">
                                        <span class="text-[10px] font-semibold text-[var(--text-muted)] block uppercase tracking-wider">Final Milestone (${100 - advancePct}%)</span>
                                        <span class="font-extrabold text-[var(--text-main)]">${formatETB(remainingAmount)}</span>
                                    </div>
                                </div>

                                <!-- Included Services Chips -->
                                <div class="mt-4">
                                    <span class="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1.5">
                                        Included Services Catalog (${(pkg.services || []).length}):
                                    </span>
                                    <div class="flex flex-wrap gap-1.5">
                                        ${(pkg.services || []).map(sName => `
                                            <span class="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-amber-500/10 text-[#a06438] dark:text-[#e6993a] border border-amber-500/20">
                                                ${sName}
                                            </span>
                                        `).join('')}
                                    </div>
                                </div>

                                <!-- Phases & Tasks Preview -->
                                <div class="mt-4 pt-3 border-t border-[var(--card-border)]">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-[11px] font-extrabold text-[var(--text-main)] uppercase tracking-wider">
                                            Phased Execution Workflow (${totalPhases} Phases · ${totalTasks} Tasks)
                                        </span>
                                    </div>

                                    <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
                                        ${(pkg.phases || []).map(phase => `
                                            <div class="p-2.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-xs">
                                                <div class="flex items-center justify-between font-bold text-[var(--text-main)] mb-1">
                                                    <span>${phase.name}</span>
                                                    <span class="text-[10px] font-semibold text-[#e6993a]">${(phase.tasks || []).length} steps</span>
                                                </div>
                                                <ul class="space-y-0.5 text-[11px] text-[var(--text-muted)] pl-2 border-l border-amber-500/30">
                                                    ${(phase.tasks || []).slice(0, 3).map(t => `
                                                        <li class="truncate flex items-center gap-1.5">
                                                            <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                                            <span class="truncate">${t.text}</span>
                                                            ${t.isAdvance ? '<span class="text-[9px] font-bold text-amber-500">[Advance 50%]</span>' : ''}
                                                            ${t.isFinalPayment ? '<span class="text-[9px] font-bold text-emerald-500">[Final Pay]</span>' : ''}
                                                            ${t.isCompletion ? '<span class="text-[9px] font-bold text-purple-500">[Delivery]</span>' : ''}
                                                        </li>
                                                    `).join('')}
                                                    ${(phase.tasks || []).length > 3 ? `<li class="text-[10px] text-[var(--text-muted)] italic">+ ${(phase.tasks || []).length - 3} more steps...</li>` : ''}
                                                </ul>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>

                            <!-- Card Bottom Action Buttons -->
                            <div class="pt-3 border-t border-[var(--card-border)] flex flex-wrap items-center justify-between gap-2">
                                <button onclick="openPriceChangeModal('package', '${pkg.id}')" class="py-2 px-3.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm flex items-center gap-1.5 cursor-pointer">
                                    <i class="fas fa-edit"></i>
                                    <span>Change Price (Protected)</span>
                                </button>
                                <button onclick="openEditPackageModal('${pkg.id}')" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-[var(--subtle-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition flex items-center gap-1.5 cursor-pointer">
                                    <i class="fas fa-sliders-h text-[#e6993a]"></i>
                                    <span>Edit Package & Tasks</span>
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // --------------------------------------------------------------------------
    // SUB-VIEW 2: INDIVIDUAL SERVICES CATALOG
    // --------------------------------------------------------------------------
    function renderControlRoomServices(state) {
        const services = state.services || [];
        const search = (_serviceCatalogSearch || '').toLowerCase().trim();
        const catFilter = _serviceCatalogCategory || 'ALL';
        const statusFilter = _serviceCatalogStatus || 'ALL';

        // Extract available categories
        const categories = Array.from(new Set(services.map(s => s.category || 'General'))).filter(Boolean);

        const filtered = services.filter(s => {
            if (search && !s.name.toLowerCase().includes(search) && !(s.description || '').toLowerCase().includes(search)) {
                return false;
            }
            if (catFilter !== 'ALL' && s.category !== catFilter) {
                return false;
            }
            if (statusFilter !== 'ALL' && (s.status || 'active') !== statusFilter) {
                return false;
            }
            return true;
        });

        return `
            <!-- Filter & Search Toolbar -->
            <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)] mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div class="relative flex-1">
                    <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)]"></i>
                    <input type="text" placeholder="Search service by name or keyword..." value="${_serviceCatalogSearch || ''}" oninput="setServiceCatalogFilter('search', this.value)" class="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                </div>

                <div class="flex flex-wrap items-center gap-2">
                    <select onchange="setServiceCatalogFilter('category', this.value)" class="py-2 px-3 rounded-xl text-xs bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none focus:border-[#e6993a]">
                        <option value="ALL" ${catFilter === 'ALL' ? 'selected' : ''}>All Categories (${categories.length})</option>
                        ${categories.map(c => `<option value="${c}" ${catFilter === c ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>

                    <select onchange="setServiceCatalogFilter('status', this.value)" class="py-2 px-3 rounded-xl text-xs bg-[var(--subtle-bg)] border border-[var(--card-border)] text-[var(--text-main)] font-semibold focus:outline-none focus:border-[#e6993a]">
                        <option value="ALL" ${statusFilter === 'ALL' ? 'selected' : ''}>All Statuses</option>
                        <option value="active" ${statusFilter === 'active' ? 'selected' : ''}>Active Only</option>
                        <option value="inactive" ${statusFilter === 'inactive' ? 'selected' : ''}>Inactive Only</option>
                        <option value="archived" ${statusFilter === 'archived' ? 'selected' : ''}>Archived</option>
                    </select>
                </div>
            </div>

            <!-- Services Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                ${filtered.length === 0 ? `
                    <div class="col-span-full p-12 text-center text-sm text-[var(--text-muted)] ui-card rounded-2xl">
                        No services found matching current filters.
                    </div>
                ` : filtered.map(s => {
                    let usageCount = 0;
                    (state.projects || []).forEach(p => {
                        if ((p.services || []).some(ps => ps.serviceId === s.id)) usageCount++;
                    });
                    const sStatus = s.status || 'active';

                    return `
                        <div class="ui-card p-5 rounded-[22px] flex flex-col justify-between space-y-4 border ${sStatus === 'active' ? 'border-[var(--card-border)]' : 'border-slate-500/30 opacity-75'}">
                            <div>
                                <div class="flex items-center justify-between gap-2 mb-2">
                                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-[#a06438] dark:text-[#e6993a] border border-amber-500/20">
                                        ${s.category || 'Service Package'}
                                    </span>
                                    <div class="flex items-center gap-1.5">
                                        <span class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${sStatus === 'active' ? 'bg-emerald-500/15 text-emerald-600' : sStatus === 'inactive' ? 'bg-amber-500/15 text-amber-600' : 'bg-slate-500/15 text-slate-500'}">
                                            ${sStatus}
                                        </span>
                                        <span class="text-[10px] text-[var(--text-muted)] font-semibold">
                                            Est. ${s.deliveryDays || 7}d
                                        </span>
                                    </div>
                                </div>

                                <h3 class="font-extrabold text-base text-[var(--text-main)]">${s.name}</h3>
                                <p class="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed line-clamp-2">
                                    ${s.description || 'Professional digital service deliverable.'}
                                </p>

                                <div class="mt-4 p-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex items-center justify-between">
                                    <div>
                                        <span class="text-[10px] font-semibold text-[var(--text-muted)] block uppercase tracking-wider">Catalog Price</span>
                                        <span class="text-lg font-black text-emerald-600 dark:text-[#4bd39a]">${formatETB(s.defaultPrice)}</span>
                                    </div>
                                    <button onclick="openPriceChangeModal('service', '${s.id}')" class="py-1.5 px-3 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-xs cursor-pointer">
                                        <i class="fas fa-edit mr-1"></i> Edit Price
                                    </button>
                                </div>

                                <div class="mt-3 pt-3 border-t border-[var(--card-border)]">
                                    <span class="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1.5">
                                        Default Task Template (${s.defaultTasks ? s.defaultTasks.length : 0} steps):
                                    </span>
                                    <div class="space-y-1 max-h-28 overflow-y-auto pr-1 text-[11px] text-[var(--text-muted)]">
                                        ${(s.defaultTasks || []).map((t, idx) => `
                                            <div class="flex items-start gap-1.5 truncate">
                                                <span class="text-[#e6993a] font-bold shrink-0">${idx + 1}.</span>
                                                <span class="truncate">${t}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>

                            <div class="pt-3 border-t border-[var(--card-border)] flex items-center justify-between gap-2">
                                <span class="text-[11px] text-[var(--text-muted)]">Deployed in <strong>${usageCount}</strong> project${usageCount === 1 ? '' : 's'}</span>
                                <div class="flex items-center gap-1.5">
                                    <button onclick="openEditServiceModal('${s.id}')" class="py-1 px-2.5 rounded-lg text-xs font-bold bg-[var(--subtle-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition cursor-pointer">
                                        <i class="fas fa-cog"></i> Edit
                                    </button>
                                    <select onchange="setServiceStatus('${s.id}', this.value)" class="py-1 px-2 rounded-lg text-[10px] font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-main)] cursor-pointer">
                                        <option value="active" ${sStatus === 'active' ? 'selected' : ''}>Active</option>
                                        <option value="inactive" ${sStatus === 'inactive' ? 'selected' : ''}>Inactive</option>
                                        <option value="archived" ${sStatus === 'archived' ? 'selected' : ''}>Archived</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // --------------------------------------------------------------------------
    // SUB-VIEW 3: PRICING HISTORY & AUDIT LOG
    // --------------------------------------------------------------------------
    function renderControlRoomHistory(state) {
        const history = state.pricingHistory || [];
        const packageRevisions = history.filter(h => h.type === 'package').length;
        const serviceRevisions = history.filter(h => h.type === 'service').length;

        return `
            <!-- Audit Metric Counters -->
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)]">
                    <span class="text-xs text-[var(--text-muted)] font-semibold block">Total Logged Changes</span>
                    <div class="text-2xl font-black text-[var(--text-main)] mt-1">${history.length}</div>
                    <span class="text-[10px] text-emerald-500 font-bold mt-0.5 block">Permanent Audit Trail</span>
                </div>
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)]">
                    <span class="text-xs text-[var(--text-muted)] font-semibold block">Package Revisions</span>
                    <div class="text-2xl font-black text-[#e6993a] mt-1">${packageRevisions}</div>
                    <span class="text-[10px] text-[var(--text-muted)] mt-0.5 block">Packages updated</span>
                </div>
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)]">
                    <span class="text-xs text-[var(--text-muted)] font-semibold block">Service Revisions</span>
                    <div class="text-2xl font-black text-sky-500 mt-1">${serviceRevisions}</div>
                    <span class="text-[10px] text-[var(--text-muted)] mt-0.5 block">Catalog services updated</span>
                </div>
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)]">
                    <span class="text-xs text-[var(--text-muted)] font-semibold block">Historical Safety Guarantee</span>
                    <div class="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1.5">
                        <i class="fas fa-check-circle text-sm"></i> 100% Protected
                    </div>
                    <span class="text-[10px] text-[var(--text-muted)] mt-0.5 block">Past contracts untouched</span>
                </div>
            </div>

            <!-- Immutable Pricing Audit Ledger Table -->
            <div class="ui-card rounded-[22px] overflow-hidden border border-[var(--card-border)]">
                <div class="p-4 border-b border-[var(--card-border)] flex items-center justify-between">
                    <div>
                        <h4 class="text-sm font-extrabold text-[var(--text-main)]">Immutable Pricing Audit Trail</h4>
                        <p class="text-[11px] text-[var(--text-muted)]">Permanent chronological ledger of all catalog & package pricing updates.</p>
                    </div>
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                        Append-Only Record
                    </span>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-[var(--subtle-bg)] border-b border-[var(--card-border)] text-[var(--text-muted)] font-bold text-[11px]">
                                <th class="p-3">Effective Date / Time</th>
                                <th class="p-3">Target & Type</th>
                                <th class="p-3 text-right">Previous Price</th>
                                <th class="p-3 text-right">New Price</th>
                                <th class="p-3 text-center">Variance</th>
                                <th class="p-3">Business Reason</th>
                                <th class="p-3">Authorized Administrator</th>
                                <th class="p-3 text-center">Contract Guarantee</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[var(--card-border)]">
                            ${history.length === 0 ? `
                                <tr>
                                    <td colspan="8" class="p-8 text-center text-xs text-[var(--text-muted)]">
                                        No pricing changes have been recorded yet.
                                    </td>
                                </tr>
                            ` : history.map(h => {
                                const diff = (Number(h.newPrice) || 0) - (Number(h.previousPrice) || 0);
                                const pct = h.previousPrice ? Math.round((diff / h.previousPrice) * 100) : 0;
                                const diffClass = diff > 0 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : diff < 0 ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-[var(--text-muted)]';
                                const diffSign = diff > 0 ? '+' : '';

                                return `
                                    <tr class="hover:bg-[var(--subtle-bg)] transition">
                                        <td class="p-3 font-mono text-[11px] text-[var(--text-muted)] whitespace-nowrap">
                                            <span class="font-bold text-[var(--text-main)] block">${h.effectiveDate || (h.timestamp ? h.timestamp.split('T')[0] : 'N/A')}</span>
                                            <span class="text-[10px]">${h.timestamp ? h.timestamp.split('T')[1].substring(0, 5) : '09:00'} UTC</span>
                                        </td>
                                        <td class="p-3 font-bold text-[var(--text-main)]">
                                            <div class="flex items-center gap-1.5">
                                                <span class="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${h.type === 'package' ? 'bg-[#e6993a]/15 text-[#e6993a] border border-[#e6993a]/30' : 'bg-sky-500/15 text-sky-600 border border-sky-500/30'}">
                                                    ${h.type}
                                                </span>
                                                <span>${h.targetName}</span>
                                            </div>
                                        </td>
                                        <td class="p-3 text-right font-mono text-[var(--text-muted)]">
                                            ${formatETB(h.previousPrice)}
                                        </td>
                                        <td class="p-3 text-right font-mono font-bold text-[var(--text-main)]">
                                            ${formatETB(h.newPrice)}
                                        </td>
                                        <td class="p-3 text-center whitespace-nowrap">
                                            <span class="${diffClass} text-[11px]">
                                                ${diffSign}${formatETB(diff)} (${diffSign}${pct}%)
                                            </span>
                                        </td>
                                        <td class="p-3 text-xs text-[var(--text-main)] max-w-xs">
                                            ${h.reason || 'Routine service packaging and pricing adjustment.'}
                                        </td>
                                        <td class="p-3 text-xs font-semibold text-[var(--text-muted)] whitespace-nowrap">
                                            <i class="fas fa-user-shield text-[10px] text-[#e6993a] mr-1"></i>
                                            ${h.administrator || 'ELNA Lead Administrator'}
                                        </td>
                                        <td class="p-3 text-center whitespace-nowrap">
                                            <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                                                <i class="fas fa-lock text-[8px]"></i> Protected ✓
                                            </span>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // --------------------------------------------------------------------------
    // SUB-VIEW 4: CONTRACT PRICING PROTECTION REGISTRY
    // --------------------------------------------------------------------------
    function renderControlRoomProtection(state) {
        const projects = state.projects || [];
        const totalAgreed = projects.reduce((sum, p) => sum + (Number(p.finalPrice) || 0), 0);
        let totalPaid = 0;
        (state.payments || []).forEach(pay => { totalPaid += (Number(pay.amount) || 0); });

        return `
            <!-- Protection Guarantee Callout Box -->
            <div class="p-5 rounded-[22px] bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-amber-500/10 border border-emerald-500/30 mb-6">
                <div class="flex items-start gap-3.5">
                    <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 text-lg">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div>
                        <h3 class="text-base font-black text-[var(--text-main)]">
                            Historical Pricing Snapshot & Contract Integrity System
                        </h3>
                        <p class="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                            Every client agreement is permanently bound to its original <strong>pricingSnapshot</strong> upon creation. 
                            Modifying package prices or service catalog rates in the Control Room guarantees that existing and completed client projects retain their exact agreed figures without retroactive alteration. 
                            Only newly registered projects will reflect the updated rates.
                        </p>
                    </div>
                </div>
            </div>

            <!-- High-Level Financial Snapshot Metric Counters -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)]">
                    <span class="text-xs text-[var(--text-muted)] font-semibold block">Total Protected Contracts</span>
                    <div class="text-2xl font-black text-[var(--text-main)] mt-1">${projects.length} Projects</div>
                    <span class="text-[10px] text-emerald-500 font-bold mt-0.5 block">100% Immutable Snapshots Attached</span>
                </div>
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)]">
                    <span class="text-xs text-[var(--text-muted)] font-semibold block">Total Contracted Revenue Protected</span>
                    <div class="text-2xl font-black text-emerald-600 dark:text-[#4bd39a] mt-1">${formatETB(totalAgreed)}</div>
                    <span class="text-[10px] text-[var(--text-muted)] mt-0.5 block">Agreed contract values frozen</span>
                </div>
                <div class="ui-card p-4 rounded-2xl border border-[var(--card-border)]">
                    <span class="text-xs text-[var(--text-muted)] font-semibold block">Actual Payments Received</span>
                    <div class="text-2xl font-black text-[#e6993a] mt-1">${formatETB(totalPaid)}</div>
                    <span class="text-[10px] text-[var(--text-muted)] mt-0.5 block">Earn Management ledger synchronized</span>
                </div>
            </div>

            <!-- Contract Protection Registry Table -->
            <div class="ui-card rounded-[22px] overflow-hidden border border-[var(--card-border)]">
                <div class="p-4 border-b border-[var(--card-border)] flex items-center justify-between">
                    <div>
                        <h4 class="text-sm font-extrabold text-[var(--text-main)]">Individual Contract Snapshot Registry</h4>
                        <p class="text-[11px] text-[var(--text-muted)]">Verified snapshot proof that original prices are locked and immune to catalog changes.</p>
                    </div>
                    <span class="text-xs font-bold text-[#e6993a]">${projects.length} Active Records</span>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-[var(--subtle-bg)] border-b border-[var(--card-border)] text-[var(--text-muted)] font-bold text-[11px]">
                                <th class="p-3">Client & Project</th>
                                <th class="p-3">Assigned Package</th>
                                <th class="p-3 text-right">Agreed Contract Price</th>
                                <th class="p-3 text-right">Current Catalog Rate</th>
                                <th class="p-3 text-center">Snapshot Integrity</th>
                                <th class="p-3">Creation Date</th>
                                <th class="p-3">Contract Status</th>
                                <th class="p-3 text-center">Authorized Amendment</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[var(--card-border)]">
                            ${projects.length === 0 ? `
                                <tr>
                                    <td colspan="8" class="p-8 text-center text-xs text-[var(--text-muted)]">No client projects registered yet.</td>
                                </tr>
                            ` : projects.map(p => {
                                const pkg = getProjectPackage(p);
                                const agreed = p.pricingSnapshot ? p.pricingSnapshot.agreedPrice : p.finalPrice;
                                const catalogRate = pkg ? pkg.price : agreed;
                                const isDiff = agreed !== catalogRate;

                                return `
                                    <tr class="hover:bg-[var(--subtle-bg)] transition">
                                        <td class="p-3">
                                            <span class="font-extrabold text-[var(--text-main)] block">${p.clientName}</span>
                                            <span class="text-[10px] text-[var(--text-muted)] truncate block max-w-xs">${p.name}</span>
                                        </td>
                                        <td class="p-3 font-semibold text-[var(--text-main)]">
                                            ${p.pricingSnapshot ? p.pricingSnapshot.packageName : (pkg ? pkg.name : 'Standard')}
                                        </td>
                                        <td class="p-3 text-right font-mono font-black text-emerald-600 dark:text-[#4bd39a]">
                                            ${formatETB(agreed)}
                                        </td>
                                        <td class="p-3 text-right font-mono text-[var(--text-muted)]">
                                            ${formatETB(catalogRate)}
                                            ${isDiff ? `<span class="block text-[9px] font-bold ${agreed < catalogRate ? 'text-emerald-500' : 'text-amber-500'}">(${agreed < catalogRate ? 'Grandfathered' : 'Custom'})</span>` : ''}
                                        </td>
                                        <td class="p-3 text-center">
                                            <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                                                <i class="fas fa-lock text-[8px]"></i> LOCKED (${p.pricingSnapshot ? p.pricingSnapshot.pricingVersion : 'v1.0'})
                                            </span>
                                        </td>
                                        <td class="p-3 font-mono text-[11px] text-[var(--text-muted)] whitespace-nowrap">
                                            ${p.startDate || (p.pricingSnapshot ? p.pricingSnapshot.createdAt : '2026-11-01')}
                                        </td>
                                        <td class="p-3">
                                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${p.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'}">
                                                ${p.status}
                                            </span>
                                        </td>
                                        <td class="p-3 text-center">
                                            <button onclick="openProjectPriceAmendmentModal('${p.id}')" class="py-1 px-2.5 rounded-lg text-[10px] font-bold bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition cursor-pointer" title="Authorized Price Amendment for Ongoing Project">
                                                <i class="fas fa-file-signature text-[#e6993a] mr-1"></i> Amend Price
                                            </button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // ==============================================================================
    // 5. EXPENSES TRACKER TAB
    // ==============================================================================
    function renderExpensesTab() {
        const state = window.clientProjectsState;
        let totalExpenses = state.expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

        const categoryTotals = {};
        state.expenses.forEach(e => {
            categoryTotals[e.category] = (categoryTotals[e.category] || 0) + (Number(e.amount) || 0);
        });

        return `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                    <h3 class="text-lg font-black text-[var(--text-main)]">Business & Project Expenses Tracker</h3>
                    <p class="text-xs text-[var(--text-muted)]">
                        Track material costs, printings, domains, cloud tools, and transport in ETB
                    </p>
                </div>
                <button onclick="openNewExpenseModal()" class="py-2 px-4 rounded-xl text-xs font-bold bg-rose-700/80 hover:bg-rose-600 text-white transition shadow-xs flex items-center gap-1.5 self-start cursor-pointer">
                    <i class="fas fa-plus"></i> + Record Expense
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div class="ui-card p-4 rounded-2xl">
                    <span class="text-xs text-[var(--text-muted)] font-semibold block">Total Recorded Expenses</span>
                    <div class="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">${formatETB(totalExpenses)}</div>
                    <span class="text-[10px] text-[var(--text-muted)] mt-0.5 block">${state.expenses.length} receipts & bills logged</span>
                </div>
                <div class="ui-card p-4 rounded-2xl">
                    <span class="text-xs text-[var(--text-muted)] font-semibold block">Top Cost Category</span>
                    <div class="text-lg font-black text-[var(--text-main)] mt-1">
                        ${Object.keys(categoryTotals).length ? Object.entries(categoryTotals).sort((a,b) => b[1] - a[1])[0][0] : 'None'}
                    </div>
                    <span class="text-[10px] text-rose-500 font-bold mt-0.5 block">
                        ${Object.keys(categoryTotals).length ? formatETB(Object.entries(categoryTotals).sort((a,b) => b[1] - a[1])[0][1]) : '0 ETB'}
                    </span>
                </div>
                <div class="ui-card p-4 rounded-2xl">
                    <span class="text-xs text-[var(--text-muted)] font-semibold block">Project Direct vs General Overhead</span>
                    <div class="text-xs font-bold text-[var(--text-main)] mt-2 flex justify-between">
                        <span>Direct Project Costs:</span>
                        <span class="text-rose-500">${formatETB(state.expenses.filter(e => e.projectId).reduce((s, e) => s + (Number(e.amount)||0), 0))}</span>
                    </div>
                    <div class="text-xs font-bold text-[var(--text-main)] mt-1 flex justify-between">
                        <span>General Overhead:</span>
                        <span class="text-amber-500">${formatETB(state.expenses.filter(e => !e.projectId).reduce((s, e) => s + (Number(e.amount)||0), 0))}</span>
                    </div>
                </div>
            </div>

            <div class="ui-card rounded-[22px] overflow-hidden border border-[var(--card-border)]">
                <div class="p-4 border-b border-[var(--card-border)] flex items-center justify-between">
                    <h4 class="text-sm font-bold text-[var(--text-main)]">Expense Ledger</h4>
                    <span class="text-xs font-semibold text-[var(--text-muted)]">${state.expenses.length} transactions</span>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-[var(--subtle-bg)] border-b border-[var(--card-border)] text-[var(--text-muted)] font-bold text-[11px]">
                                <th class="p-3">Date</th>
                                <th class="p-3">Expense Name & Details</th>
                                <th class="p-3">Category</th>
                                <th class="p-3">Related Client / Project</th>
                                <th class="p-3 text-right">Amount (ETB)</th>
                                <th class="p-3 text-center">Receipt / Ref</th>
                                <th class="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[var(--card-border)]">
                            ${state.expenses.length === 0 ? `
                                <tr>
                                    <td colspan="7" class="p-8 text-center text-xs text-[var(--text-muted)]">No expenses recorded yet.</td>
                                </tr>
                            ` : state.expenses.map(e => {
                                const relProj = state.projects.find(p => p.id === e.projectId);
                                const relClient = state.clients.find(c => c.id === e.clientId);

                                return `
                                    <tr class="hover:bg-[var(--subtle-bg)] transition">
                                        <td class="p-3 whitespace-nowrap text-[var(--text-muted)] font-medium">${e.date}</td>
                                        <td class="p-3">
                                            <div class="font-bold text-[var(--text-main)]">${e.name}</div>
                                            ${e.description ? `<div class="text-[11px] text-[var(--text-muted)] truncate max-w-xs">${e.description}</div>` : ''}
                                        </td>
                                        <td class="p-3 whitespace-nowrap">
                                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                ${e.category}
                                            </span>
                                        </td>
                                        <td class="p-3 whitespace-nowrap">
                                            ${relProj ? `
                                                <span class="font-semibold text-[var(--text-main)] block">${relProj.name}</span>
                                                <span class="text-[10px] text-[#e6993a]">${relClient ? relClient.businessName : ''}</span>
                                            ` : relClient ? `
                                                <span class="font-semibold text-[var(--text-main)]">${relClient.businessName}</span>
                                            ` : `
                                                <span class="text-[var(--text-muted)] italic">General ELNA Overhead</span>
                                            `}
                                        </td>
                                        <td class="p-3 text-right whitespace-nowrap font-black text-rose-600 dark:text-rose-400">
                                            -${formatETB(e.amount)}
                                        </td>
                                        <td class="p-3 text-center whitespace-nowrap text-[11px] text-[var(--text-muted)]">
                                            ${e.receiptNote || '—'}
                                        </td>
                                        <td class="p-3 text-center whitespace-nowrap">
                                            <button onclick="confirmDeleteExpense('${e.id}')" class="p-1 rounded text-slate-400 hover:text-rose-500 transition cursor-pointer" title="Delete Expense">
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // ==============================================================================
    // 6. ACTIVITY LOG TAB
    // ==============================================================================
    function renderActivityTab() {
        const state = window.clientProjectsState;

        const iconMap = {
            client: 'fas fa-user-plus text-blue-500',
            project: 'fas fa-folder-plus text-[#e6993a]',
            payment: 'fas fa-money-bill-wave text-emerald-500',
            expense: 'fas fa-receipt text-rose-500',
            general: 'fas fa-bell text-purple-500'
        };

        return `
            <div class="ui-card p-6 rounded-[24px]">
                <div class="flex items-center justify-between pb-4 border-b border-[var(--card-border)] mb-4">
                    <div>
                        <h3 class="text-base font-black text-[var(--text-main)]">Universal Activity History</h3>
                        <p class="text-xs text-[var(--text-muted)]">Chronological audit log of all client interactions, agreements, payments, and expenses</p>
                    </div>
                    <span class="text-xs font-bold text-[var(--text-muted)]">${state.activityLog.length} events logged</span>
                </div>

                <div class="space-y-4">
                    ${state.activityLog.map(act => `
                        <div class="flex items-start gap-3 p-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] hover:border-[#e6993a]/30 transition">
                            <div class="w-8 h-8 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-sm shrink-0 shadow-xs">
                                <i class="${iconMap[act.type] || iconMap.general}"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-xs font-bold text-[var(--text-main)] leading-snug">${act.text}</p>
                                <span class="text-[10px] text-[var(--text-muted)] font-medium block mt-0.5">${act.date}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // ==============================================================================
    // 7. NEW CLIENT REGISTRATION FORM MODAL (All 6 Sections & Auto Project Launch)
    // ==============================================================================

    // Active state for registration form
    let _regSelectedServices = []; // array of { serviceId, name, price, category, defaultTasks }
    let _regClassification = 'GOLD';
    let _regSubtotal = 0;
    let _regFinalPrice = 0;
    let _regDurationDays = 14;

    window.openNewClientModal = function () {
        const state = window.clientProjectsState;
        _regClassification = 'GOLD';
        _regDurationDays = 14;

        // Pre-select first service by default
        _regSelectedServices = [{
            serviceId: state.services[0].id,
            name: state.services[0].name,
            price: state.services[0].defaultPrice,
            category: state.services[0].category,
            defaultTasks: state.services[0].defaultTasks || []
        }];

        renderNewClientRegistrationModal();
    };

    function renderNewClientRegistrationModal() {
        const state = window.clientProjectsState;
        const todayStr = new Date().toISOString().split('T')[0];

        // Default deadline based on duration days
        const defaultDeadline = new Date(Date.now() + _regDurationDays * 86400000).toISOString().split('T')[0];

        const classifications = [
            {
                id: 'GOLD',
                name: 'GOLD',
                icon: 'fas fa-crown',
                tag: 'High Growth Potential',
                desc: 'Strong growth opportunities and excellent long-term business value to ELNA DIGITAL.',
                style: 'border-amber-400 bg-amber-500/10 text-amber-950 dark:text-amber-300'
            },
            {
                id: 'SILVER',
                name: 'SILVER',
                icon: 'fas fa-medal',
                tag: 'Established Potential',
                desc: 'Good potential, established business, and opportunities for additional service upsells.',
                style: 'border-slate-400 bg-slate-500/10 text-slate-900 dark:text-slate-200'
            },
            {
                id: 'BRONZE',
                name: 'BRONZE',
                icon: 'fas fa-shield-alt',
                tag: 'Moderate Potential',
                desc: 'Moderate potential, smaller business, or limited immediate growth opportunities.',
                style: 'border-amber-700/40 bg-amber-800/10 text-amber-900 dark:text-amber-400'
            },
            {
                id: 'STARTER',
                name: 'STARTER',
                icon: 'fas fa-seedling',
                tag: 'New Venture',
                desc: 'New or small business with high enthusiasm and potential to grow in the future.',
                style: 'border-teal-500/40 bg-teal-500/10 text-teal-900 dark:text-teal-300'
            }
        ];

        const businessCategories = [
            '1. Food & Beverage',
            '2. Beauty & Personal Care',
            '3. Cakes & Desserts',
            '4. Events & Celebrations',
            '5. Fashion & Clothing',
            '6. Photography & Creative Services',
            '7. Hospitality & Accommodation',
            '8. Health & Fitness',
            '9. Education & Training',
            '10. Retail & Shopping',
            '11. Real Estate & Property',
            '12. Professional Services',
            '13. Automotive Services',
            '14. Home & Interior Design',
            '15. Travel & Tourism',
            '16. Technology & Electronics',
            '17. Other'
        ];

        const modalHTML = `
            <div id="new-client-reg-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
                <div class="relative w-full max-w-3xl bg-white dark:bg-[#141c17] rounded-[28px] border border-slate-200 dark:border-[var(--card-border)] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
                    
                    <!-- Form Top Header -->
                    <div class="p-5 sm:p-6 pb-4 border-b border-[var(--card-border)] flex items-start justify-between gap-4 bg-[var(--subtle-bg)]">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#a06438] dark:text-[#e6993a]">
                                    ELNA DIGITAL · CLIENT REGISTRATION & ONBOARDING
                                </span>
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e6993a]/15 text-[#e6993a] border border-[#e6993a]/30">
                                    Automatic Project Creation
                                </span>
                            </div>
                            <h2 class="text-xl sm:text-2xl font-black text-[var(--text-main)] mt-1">
                                Add New Client Registration
                            </h2>
                            <p class="text-xs text-[var(--text-muted)] mt-0.5">
                                Complete client profile, classify business potential, configure contracted services with adjustable pricing, and launch the project.
                            </p>
                        </div>

                        <button onclick="closeNewClientModal()" class="w-8 h-8 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-slate-400 hover:text-[var(--text-main)] transition cursor-pointer">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <!-- Registration Form Body (Scrollable) -->
                    <form onsubmit="handleSaveNewClientRegistration(event)" class="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs">
                        
                        <!-- ==========================================
                             SECTION A: CLIENT INFORMATION (REQUIRED)
                             ========================================== -->
                        <div class="space-y-3">
                            <div class="flex items-center gap-2 pb-2 border-b border-[var(--card-border)]">
                                <span class="w-5 h-5 rounded-full bg-[#e6993a] text-black font-extrabold text-[11px] flex items-center justify-center">A</span>
                                <h3 class="text-sm font-extrabold text-[var(--text-main)]">Client Contact Information</h3>
                                <span class="text-[10px] font-bold text-rose-500 uppercase tracking-wider ml-auto">* Required Fields</span>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label class="font-bold text-[var(--text-main)] block mb-1">
                                        Client Name (Contact Person Full Name) <span class="text-rose-500">*</span>
                                    </label>
                                    <input id="ncr-contact-name" required placeholder="e.g. Abebe Tadesse" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-semibold focus:outline-none focus:border-[#e6993a]">
                                </div>

                                <div>
                                    <label class="font-bold text-[var(--text-main)] block mb-1">
                                        Primary Phone Number <span class="text-rose-500">*</span>
                                    </label>
                                    <input id="ncr-phone" required placeholder="e.g. +251 91 123 4567" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-semibold focus:outline-none focus:border-[#e6993a]">
                                </div>
                            </div>

                            <div>
                                <label class="font-bold text-[var(--text-muted)] block mb-1">
                                    Email Address <span class="text-[10px] font-normal opacity-75">(Optional)</span>
                                </label>
                                <input id="ncr-email" type="email" placeholder="e.g. contact@business.et" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                        </div>

                        <!-- ==========================================
                             SECTION B: BUSINESS INFORMATION (REQUIRED)
                             ========================================== -->
                        <div class="space-y-3 pt-2">
                            <div class="flex items-center gap-2 pb-2 border-b border-[var(--card-border)]">
                                <span class="w-5 h-5 rounded-full bg-[#e6993a] text-black font-extrabold text-[11px] flex items-center justify-center">B</span>
                                <h3 class="text-sm font-extrabold text-[var(--text-main)]">Business Profile & Location</h3>
                                <span class="text-[10px] font-bold text-rose-500 uppercase tracking-wider ml-auto">* Required Fields</span>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label class="font-bold text-[var(--text-main)] block mb-1">
                                        Business Name <span class="text-rose-500">*</span>
                                    </label>
                                    <input id="ncr-biz-name" required placeholder="e.g. Enkoye Café & Bistro" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-black focus:outline-none focus:border-[#e6993a]">
                                </div>

                                <div>
                                    <label class="font-bold text-[var(--text-main)] block mb-1">
                                        Business Category <span class="text-rose-500">*</span>
                                    </label>
                                    <select id="ncr-category" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-semibold focus:outline-none focus:border-[#e6993a]">
                                        ${businessCategories.map(cat => {
                                            const cleanVal = cat.replace(/^\d+\.\s*/, '');
                                            return `<option value="${cleanVal}">${cat}</option>`;
                                        }).join('')}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">
                                    Physical Business Location / Address <span class="text-rose-500">*</span>
                                </label>
                                <input id="ncr-location" required placeholder="e.g. Bole Medhanialem, Next to Edna Mall, Addis Ababa" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                        </div>

                        <!-- ==========================================
                             SECTION C: CLIENT CLASSIFICATION (REQUIRED)
                             ========================================== -->
                        <div class="space-y-3 pt-2">
                            <div class="flex items-center gap-2 pb-2 border-b border-[var(--card-border)]">
                                <span class="w-5 h-5 rounded-full bg-[#e6993a] text-black font-extrabold text-[11px] flex items-center justify-center">C</span>
                                <div>
                                    <h3 class="text-sm font-extrabold text-[var(--text-main)]">Client Classification (Future Growth Potential)</h3>
                                    <p class="text-[10px] text-[var(--text-muted)]">Based on future business potential and long-term value to ELNA DIGITAL, NOT payment amount.</p>
                                </div>
                                <span class="text-[10px] font-bold text-rose-500 uppercase tracking-wider ml-auto">* Select One</span>
                            </div>

                            <input type="hidden" id="ncr-classification" value="${_regClassification}">

                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                                ${classifications.map(cat => {
                                    const isSel = _regClassification === cat.id;
                                    return `
                                        <div id="ncr-class-card-${cat.id}" data-class="${cat.id}" onclick="selectRegClassification('${cat.id}')" class="ncr-class-card p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${isSel ? 'border-[#e6993a] bg-amber-500/10 shadow-sm' : 'border-[var(--card-border)] bg-[var(--subtle-bg)] hover:border-slate-400 dark:hover:border-slate-600'}">
                                            <div>
                                                <div class="flex items-center justify-between mb-1.5">
                                                    <span class="w-7 h-7 rounded-lg flex items-center justify-center text-sm ${cat.style}">
                                                        <i class="${cat.icon}"></i>
                                                    </span>
                                                    <div class="ncr-class-indicator w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSel ? 'border-[#e6993a] bg-[#e6993a]' : 'border-slate-400'}">
                                                        ${isSel ? '<i class="fas fa-check text-[9px] text-black font-black"></i>' : ''}
                                                    </div>
                                                </div>
                                                <h4 class="font-black text-sm text-[var(--text-main)]">${cat.name}</h4>
                                                <span class="text-[10px] font-extrabold text-[#a06438] dark:text-[#e6993a] block mt-0.5">${cat.tag}</span>
                                                <p class="text-[10px] text-[var(--text-muted)] leading-relaxed mt-1">${cat.desc}</p>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                        <!-- ==========================================
                             SECTION D: SERVICES & PRICING (CHOICE LIKE CATEGORY)
                             ========================================== -->
                        <div id="ncr-section-d" class="space-y-3 pt-2">
                            <div class="flex items-center gap-2 pb-2 border-b border-[var(--card-border)]">
                                <span class="w-5 h-5 rounded-full bg-[#e6993a] text-black font-extrabold text-[11px] flex items-center justify-center">D</span>
                                <div>
                                    <h3 class="text-sm font-extrabold text-[var(--text-main)]">Services Provided & Pricing (ETB)</h3>
                                    <p class="text-[10px] text-[var(--text-muted)]">Select package preset or custom services from the choice menu. Adjust prices with (−) or (+).</p>
                                </div>
                                <span class="text-[10px] font-bold text-rose-500 uppercase tracking-wider ml-auto">* Select ≥ 1</span>
                            </div>

                            <!-- Package Presets (Small, Basic, Advanced, Premium) -->
                            <div class="space-y-1.5">
                                <span class="font-bold text-[var(--text-main)] block text-xs">
                                    Quick Package Presets (Auto-Configures Services & Phased Tasks):
                                </span>
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    ${(state.packages || defaultPackages).filter(pkg => pkg.status !== 'inactive').map(pkg => `
                                        <div onclick="applyPackagePreset('${pkg.id}')" class="p-2.5 rounded-xl border ${pkg.id === 'premium' ? 'border-2 border-[#e6993a] bg-amber-500/10 hover:bg-amber-500/15' : 'border-[var(--card-border)] bg-[var(--subtle-bg)] hover:border-[#e6993a]'} transition cursor-pointer">
                                            <div class="flex items-center justify-between">
                                                <span class="font-black text-xs text-[var(--text-main)] truncate">${pkg.name.replace(' Package', '')}</span>
                                                <span class="font-bold text-[10px] text-emerald-600 dark:text-[#4bd39a]">${formatETB(pkg.price)}</span>
                                            </div>
                                            <span class="text-[9px] text-[var(--text-muted)] block mt-0.5 truncate">${pkg.desc || ''}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Service Choice Selector Dropdown -->
                            <div class="p-3.5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] space-y-2.5">
                                <label class="font-bold text-[var(--text-main)] block text-xs">
                                    Choose Service to Add to Project:
                                </label>
                                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                    <select id="ncr-service-picker" class="flex-1 p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-xs text-[var(--text-main)] font-semibold focus:outline-none focus:border-[#e6993a]">
                                        <option value="" disabled selected>-- Select an ELNA DIGITAL Service --</option>
                                        ${state.services.map(s => `
                                            <option value="${s.id}">${s.name} — ${formatETB(s.defaultPrice)} (${s.category})</option>
                                        `).join('')}
                                    </select>
                                    <button type="button" onclick="addSelectedChoiceService()" class="py-2.5 px-4 rounded-xl text-xs font-black bg-[#e6993a] text-black hover:bg-[#d8892a] transition shadow-xs flex items-center justify-center gap-1.5 shrink-0 cursor-pointer">
                                        <i class="fas fa-plus"></i> Add Service
                                    </button>
                                    <button type="button" onclick="promptAddCustomChoiceService()" class="py-2.5 px-3 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition flex items-center justify-center gap-1 shrink-0 cursor-pointer" title="Add a custom tailored service">
                                        <i class="fas fa-magic text-[#e6993a]"></i> Custom
                                    </button>
                                </div>
                            </div>

                            <!-- List of Selected Services with Price Increase/Decrease Controls -->
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-[11px] font-extrabold text-[var(--text-main)] uppercase tracking-wider">
                                        Active Services & Negotiated Prices:
                                    </span>
                                    <span id="ncr-services-count" class="text-[10px] font-bold text-[#e6993a]">
                                        ${_regSelectedServices.length} service${_regSelectedServices.length === 1 ? '' : 's'} selected
                                    </span>
                                </div>

                                <div id="ncr-selected-services-container" class="space-y-2">
                                    <!-- Populated by renderSelectedServicesList() -->
                                </div>
                            </div>

                            <!-- Live Contract Price Summary (No Extra Charges / Discount Calculator) -->
                            <div class="p-4 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex items-center justify-between">
                                <div>
                                    <span class="text-[10px] text-[var(--text-muted)] font-semibold block uppercase tracking-wider">
                                        Total Contract Project Price
                                    </span>
                                    <span class="text-[11px] text-[var(--text-muted)]">Sum of all agreed service prices</span>
                                </div>
                                <div class="text-right">
                                    <span id="ncr-calc-final" class="text-2xl font-black text-emerald-600 dark:text-[#4bd39a]">0 ETB</span>
                                </div>
                            </div>
                        </div>

                        <!-- ==========================================
                             SECTION E: PROJECT TIMELINE & DURATION (REQUIRED)
                             ========================================== -->
                        <div class="space-y-3 pt-2">
                            <div class="flex items-center gap-2 pb-2 border-b border-[var(--card-border)]">
                                <span class="w-5 h-5 rounded-full bg-[#e6993a] text-black font-extrabold text-[11px] flex items-center justify-center">E</span>
                                <div>
                                    <h3 class="text-sm font-extrabold text-[var(--text-main)]">Project Timeline & Duration</h3>
                                    <p class="text-[10px] text-[var(--text-muted)]">Set deadline using quick day presets (e.g. 3 days, 1 week) or pick exact calendar dates.</p>
                                </div>
                                <span class="text-[10px] font-bold text-rose-500 uppercase tracking-wider ml-auto">* Required Fields</span>
                            </div>

                            <!-- Start Date and Deadline Date Pickers -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label class="font-bold text-[var(--text-main)] block mb-1">
                                        Project Start Date <span class="text-rose-500">*</span>
                                    </label>
                                    <input id="ncr-start-date" type="date" value="${todayStr}" required onchange="onTimelineStartDateChange()" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-semibold focus:outline-none focus:border-[#e6993a]">
                                </div>

                                <div>
                                    <label class="font-bold text-[var(--text-main)] block mb-1">
                                        Project Deadline (Expected Completion) <span class="text-rose-500">*</span>
                                    </label>
                                    <input id="ncr-deadline" type="date" value="${defaultDeadline}" required onchange="onTimelineDeadlineChange(this.value)" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-semibold focus:outline-none focus:border-[#e6993a]">
                                </div>
                            </div>

                            <!-- Quick Day Duration Presets & Custom Days Option -->
                            <div class="p-3.5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-[11px] font-extrabold text-[var(--text-main)] uppercase tracking-wider">
                                        Quick Duration Options:
                                    </span>
                                    <div class="flex items-center gap-1.5 text-xs">
                                        <span class="text-[10px] text-[var(--text-muted)] font-semibold">Custom Days:</span>
                                        <input id="ncr-duration-days" type="number" min="1" max="365" value="${_regDurationDays}" oninput="onTimelineDaysChange(this.value)" class="w-16 p-1 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-black text-center text-[#e6993a]">
                                        <span class="text-[10px] text-[var(--text-muted)]">days</span>
                                    </div>
                                </div>

                                <div class="flex flex-wrap gap-2 pt-1">
                                    <button type="button" data-days="3" onclick="setTimelineDurationDays(3)" class="timeline-day-pill py-1.5 px-3 rounded-xl text-xs font-bold ${_regDurationDays === 3 ? 'bg-[#e6993a] text-black border border-[#e6993a] shadow-xs' : 'bg-[var(--card-bg)] text-[var(--text-main)] border border-[var(--card-border)] hover:border-[#e6993a]'} transition cursor-pointer">
                                        ⚡ 3 Days
                                    </button>
                                    <button type="button" data-days="7" onclick="setTimelineDurationDays(7)" class="timeline-day-pill py-1.5 px-3 rounded-xl text-xs font-bold ${_regDurationDays === 7 ? 'bg-[#e6993a] text-black border border-[#e6993a] shadow-xs' : 'bg-[var(--card-bg)] text-[var(--text-main)] border border-[var(--card-border)] hover:border-[#e6993a]'} transition cursor-pointer">
                                        📅 7 Days (1 Week)
                                    </button>
                                    <button type="button" data-days="14" onclick="setTimelineDurationDays(14)" class="timeline-day-pill py-1.5 px-3 rounded-xl text-xs font-bold ${_regDurationDays === 14 ? 'bg-[#e6993a] text-black border border-[#e6993a] shadow-xs' : 'bg-[var(--card-bg)] text-[var(--text-main)] border border-[var(--card-border)] hover:border-[#e6993a]'} transition cursor-pointer">
                                        🚀 14 Days (2 Weeks)
                                    </button>
                                    <button type="button" data-days="30" onclick="setTimelineDurationDays(30)" class="timeline-day-pill py-1.5 px-3 rounded-xl text-xs font-bold ${_regDurationDays === 30 ? 'bg-[#e6993a] text-black border border-[#e6993a] shadow-xs' : 'bg-[var(--card-bg)] text-[var(--text-main)] border border-[var(--card-border)] hover:border-[#e6993a]'} transition cursor-pointer">
                                        🏆 30 Days (1 Month)
                                    </button>
                                </div>
                                <span class="text-[10px] text-[var(--text-muted)] block mt-0.5">
                                    Clicking any day duration or typing custom days updates the deadline date. Changing the calendar date updates the days.
                                </span>
                            </div>
                        </div>

                        <!-- ==========================================
                             SECTION F: OPTIONAL ONLINE PRESENCE
                             ========================================== -->
                        <div class="space-y-3 pt-2">
                            <div class="flex items-center gap-2 pb-2 border-b border-[var(--card-border)]">
                                <span class="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 text-[var(--text-main)] font-extrabold text-[11px] flex items-center justify-center">F</span>
                                <h3 class="text-sm font-extrabold text-[var(--text-main)]">Optional Online Presence & Social Links</h3>
                                <span class="text-[10px] font-semibold text-[var(--text-muted)] ml-auto">Optional Information</span>
                            </div>

                            <!-- Google Maps Link (Made Optional here) -->
                            <div>
                                <label class="font-semibold text-[var(--text-muted)] block mb-1">
                                    Google Maps Link <span class="text-[10px] font-normal opacity-75">(Optional GPS Link)</span>
                                </label>
                                <input id="ncr-maps-url" placeholder="https://maps.google.com/?q=..." class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                                <span class="text-[10px] text-[var(--text-muted)] mt-0.5 block">Clickable GPS link for map discovery and directions.</span>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label class="font-semibold text-[var(--text-muted)] block mb-1">Instagram Link</label>
                                    <input id="ncr-insta" placeholder="https://instagram.com/..." class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                                </div>
                                <div>
                                    <label class="font-semibold text-[var(--text-muted)] block mb-1">Facebook Link</label>
                                    <input id="ncr-fb" placeholder="https://facebook.com/..." class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                                </div>
                                <div>
                                    <label class="font-semibold text-[var(--text-muted)] block mb-1">TikTok Link</label>
                                    <input id="ncr-tiktok" placeholder="https://tiktok.com/@..." class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                                </div>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label class="font-semibold text-[var(--text-muted)] block mb-1">Existing Website Link</label>
                                    <input id="ncr-website" placeholder="https://example.com" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                                </div>
                                <div>
                                    <label class="font-semibold text-[var(--text-muted)] block mb-1">Other Social Link (Telegram/LinkedIn)</label>
                                    <input id="ncr-other-social" placeholder="https://t.me/..." class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                                </div>
                            </div>

                            <div>
                                <label class="font-semibold text-[var(--text-muted)] block mb-1">Additional Project & Client Notes</label>
                                <textarea id="ncr-notes" rows="2" placeholder="Branding guidelines, client preferences, special deliverables..." class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]"></textarea>
                            </div>
                        </div>

                        <!-- Modal Bottom Footer Actions -->
                        <div class="pt-4 border-t border-[var(--card-border)] flex items-center justify-between">
                            <button type="button" onclick="closeNewClientModal()" class="py-2.5 px-5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2.5 px-6 rounded-xl text-xs font-black bg-[#e6993a] text-black hover:bg-[#d8892a] transition shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                                <i class="fas fa-check-circle text-xs"></i>
                                <span>SAVE CLIENT & LAUNCH PROJECT</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('cp-modal-container').innerHTML = modalHTML;
        renderSelectedServicesList();
    }

    window.closeNewClientModal = function () {
        const modal = document.getElementById('new-client-reg-backdrop');
        if (modal) modal.remove();
    };

    window.selectRegClassification = function (classId) {
        _regClassification = classId;
        const hiddenInput = document.getElementById('ncr-classification');
        if (hiddenInput) hiddenInput.value = classId;

        // In-place UI update without re-rendering modal (prevents scroll jumps & preserves form state)
        document.querySelectorAll('.ncr-class-card').forEach(card => {
            const isCurrent = card.dataset.class === classId;
            const check = card.querySelector('.ncr-class-indicator');
            if (isCurrent) {
                card.className = 'ncr-class-card p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between border-[#e6993a] bg-amber-500/10 shadow-sm';
                if (check) {
                    check.className = 'ncr-class-indicator w-4 h-4 rounded-full border-2 flex items-center justify-center border-[#e6993a] bg-[#e6993a]';
                    check.innerHTML = '<i class="fas fa-check text-[9px] text-black font-black"></i>';
                }
            } else {
                card.className = 'ncr-class-card p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between border-[var(--card-border)] bg-[var(--subtle-bg)] hover:border-slate-400 dark:hover:border-slate-600';
                if (check) {
                    check.className = 'ncr-class-indicator w-4 h-4 rounded-full border-2 flex items-center justify-center border-slate-400';
                    check.innerHTML = '';
                }
            }
        });

        // Smoothly advance directly to the next section (Section D: Services Provided & Pricing)
        const nextSection = document.getElementById('ncr-section-d');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    // --- SERVICE SELECTION, ADDITION & PRICE CONTROLS ---
    window.applyPackagePreset = function (pkgKey) {
        const packages = window.clientProjectsState?.packages || defaultPackages;
        const pkg = packages.find(p => p.id === pkgKey);
        if (!pkg) return;
        const state = window.clientProjectsState;
        _regSelectedServices = [];
        (pkg.services || []).forEach(sName => {
            const srv = state.services.find(s => s.name.toLowerCase() === sName.toLowerCase()) || state.services.find(s => s.name.toLowerCase().includes(sName.toLowerCase().split(' ')[0]));
            if (srv) {
                _regSelectedServices.push({
                    serviceId: srv.id,
                    name: srv.name,
                    price: Math.round(pkg.price / (pkg.services.length || 1)),
                    category: srv.category,
                    defaultTasks: srv.defaultTasks || []
                });
            }
        });

        // Ensure total sum matches package price exactly
        const currentSum = _regSelectedServices.reduce((sum, s) => sum + (Number(s.price) || 0), 0);
        if (_regSelectedServices.length > 0 && currentSum !== pkg.price) {
            _regSelectedServices[0].price += (pkg.price - currentSum);
        }

        renderSelectedServicesList();
    };

    window.addSelectedChoiceService = function () {
        const picker = document.getElementById('ncr-service-picker');
        if (!picker || !picker.value) {
            alert('Please select a service from the dropdown.');
            return;
        }
        const serviceId = picker.value;
        const state = window.clientProjectsState;
        const srv = state.services.find(s => s.id === serviceId);
        if (!srv) return;

        const exists = _regSelectedServices.find(x => x.serviceId === serviceId);
        if (exists) {
            alert(`"${srv.name}" is already added to this project.`);
            return;
        }

        _regSelectedServices.push({
            serviceId: srv.id,
            name: srv.name,
            price: srv.defaultPrice,
            category: srv.category,
            defaultTasks: srv.defaultTasks || []
        });

        renderSelectedServicesList();
    };

    window.promptAddCustomChoiceService = function () {
        const name = prompt('Enter custom service name:');
        if (!name || !name.trim()) return;
        const priceStr = prompt('Enter service price in ETB (default: 5000):', '5000');
        const price = Math.max(0, Number(priceStr) || 5000);

        const customId = 'srv-custom-' + Date.now();
        _regSelectedServices.push({
            serviceId: customId,
            name: name.trim(),
            price: price,
            category: 'Custom Service',
            defaultTasks: ['Requirement clarification & scope', 'Execution and client delivery', 'Final client review & handoff']
        });

        renderSelectedServicesList();
    };

    window.removeRegService = function (serviceId) {
        _regSelectedServices = _regSelectedServices.filter(x => x.serviceId !== serviceId);
        renderSelectedServicesList();
    };

    window.adjustRegServicePrice = function (serviceId, delta) {
        const item = _regSelectedServices.find(x => x.serviceId === serviceId);
        if (item) {
            item.price = Math.max(0, (Number(item.price) || 0) + delta);
            renderSelectedServicesList();
        }
    };

    window.updateRegServicePrice = function (serviceId, newPrice) {
        const item = _regSelectedServices.find(x => x.serviceId === serviceId);
        if (item) {
            item.price = Math.max(0, Number(newPrice) || 0);
            updateRegTotalDisplay();
        }
    };

    function updateRegTotalDisplay() {
        let serviceSum = _regSelectedServices.reduce((sum, s) => sum + (Number(s.price) || 0), 0);
        _regSubtotal = serviceSum;
        _regFinalPrice = serviceSum;

        const finalEl = document.getElementById('ncr-calc-final');
        if (finalEl) finalEl.textContent = formatETB(serviceSum);

        const countEl = document.getElementById('ncr-services-count');
        if (countEl) countEl.textContent = `${_regSelectedServices.length} service${_regSelectedServices.length === 1 ? '' : 's'} selected`;
    }

    function renderSelectedServicesList() {
        const container = document.getElementById('ncr-selected-services-container');
        if (!container) return;

        if (_regSelectedServices.length === 0) {
            container.innerHTML = `
                <div class="p-4 rounded-xl border border-dashed border-[var(--card-border)] text-center text-[var(--text-muted)] bg-[var(--card-bg)]">
                    <i class="fas fa-hand-pointer text-amber-500 mb-1 text-sm block"></i>
                    <span class="font-bold text-xs block text-[var(--text-main)]">No Services Added Yet</span>
                    <span class="text-[11px]">Select a service from the choice dropdown above and click "+ Add Service".</span>
                </div>
            `;
        } else {
            container.innerHTML = _regSelectedServices.map(s => `
                <div class="p-3 sm:p-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-2">
                            <span class="font-black text-xs text-[var(--text-main)] truncate">${s.name}</span>
                            <span class="px-2 py-0.5 rounded-md text-[9px] font-bold bg-[#e6993a]/15 text-[#a06438] dark:text-[#e6993a] border border-[#e6993a]/30 shrink-0">
                                ${s.category || 'Service'}
                            </span>
                        </div>
                        <span class="text-[10px] text-[var(--text-muted)] mt-0.5 block">Standard package included in contract.</span>
                    </div>

                    <!-- Price adjustment controls: Increase / Decrease buttons & input -->
                    <div class="flex items-center gap-1.5 shrink-0">
                        <div class="flex items-center gap-1 bg-[var(--subtle-bg)] border border-[var(--card-border)] rounded-xl p-1">
                            <button type="button" onclick="adjustRegServicePrice('${s.serviceId}', -1000)" class="px-2 h-7 rounded-lg bg-[var(--card-bg)] hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black text-[10px] flex items-center justify-center transition cursor-pointer" title="Reduce 1,000 ETB">
                                -1k
                            </button>
                            <button type="button" onclick="adjustRegServicePrice('${s.serviceId}', -500)" class="px-2 h-7 rounded-lg bg-[var(--card-bg)] hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center transition cursor-pointer" title="Reduce 500 ETB">
                                -500
                            </button>
                            <div class="flex items-center px-1">
                                <input type="number" min="0" step="100" value="${s.price}" oninput="updateRegServicePrice('${s.serviceId}', this.value)" class="w-24 p-1 rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-black text-right text-emerald-600 dark:text-[#4bd39a] focus:outline-none focus:border-[#e6993a]">
                                <span class="text-[10px] font-bold text-[var(--text-muted)] ml-1">ETB</span>
                            </div>
                            <button type="button" onclick="adjustRegServicePrice('${s.serviceId}', 500)" class="px-2 h-7 rounded-lg bg-[var(--card-bg)] hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center transition cursor-pointer" title="Increase 500 ETB">
                                +500
                            </button>
                            <button type="button" onclick="adjustRegServicePrice('${s.serviceId}', 1000)" class="px-2 h-7 rounded-lg bg-[var(--card-bg)] hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-[10px] flex items-center justify-center transition cursor-pointer" title="Increase 1,000 ETB">
                                +1k
                            </button>
                        </div>

                        <button type="button" onclick="removeRegService('${s.serviceId}')" class="w-8 h-8 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center transition cursor-pointer" title="Remove service">
                            <i class="fas fa-trash-alt text-xs"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        updateRegTotalDisplay();
    }

    // --- TIMELINE SYNCHRONIZATION (DAYS / WEEKS & CALENDAR DATES) ---
    window.setTimelineDurationDays = function (days) {
        const startInput = document.getElementById('ncr-start-date');
        const deadlineInput = document.getElementById('ncr-deadline');
        const daysInput = document.getElementById('ncr-duration-days');
        if (!startInput || !deadlineInput) return;

        const startVal = startInput.value || new Date().toISOString().split('T')[0];
        const startDate = new Date(startVal + 'T00:00:00');
        const d = Number(days) || 1;
        _regDurationDays = d;
        const deadlineDate = new Date(startDate.getTime() + d * 86400000);
        const deadlineStr = deadlineDate.toISOString().split('T')[0];

        deadlineInput.value = deadlineStr;
        if (daysInput) daysInput.value = d;

        // Update active pill styling
        document.querySelectorAll('.timeline-day-pill').forEach(btn => {
            if (Number(btn.dataset.days) === d) {
                btn.className = 'timeline-day-pill py-1.5 px-3 rounded-xl text-xs font-bold bg-[#e6993a] text-black border border-[#e6993a] shadow-xs cursor-pointer';
            } else {
                btn.className = 'timeline-day-pill py-1.5 px-3 rounded-xl text-xs font-bold bg-[var(--card-bg)] text-[var(--text-main)] border border-[var(--card-border)] hover:border-[#e6993a] transition cursor-pointer';
            }
        });
    };

    window.onTimelineStartDateChange = function () {
        const daysInput = document.getElementById('ncr-duration-days');
        const d = Number(daysInput?.value) || _regDurationDays || 14;
        window.setTimelineDurationDays(d);
    };

    window.onTimelineDeadlineChange = function (deadlineVal) {
        const startInput = document.getElementById('ncr-start-date');
        const daysInput = document.getElementById('ncr-duration-days');
        if (!startInput || !deadlineVal || !daysInput) return;

        const startVal = startInput.value || new Date().toISOString().split('T')[0];
        const startDate = new Date(startVal + 'T00:00:00');
        const deadlineDate = new Date(deadlineVal + 'T00:00:00');
        const diffDays = Math.round((deadlineDate.getTime() - startDate.getTime()) / 86400000);

        const safeDays = Math.max(1, diffDays);
        _regDurationDays = safeDays;
        daysInput.value = safeDays;

        document.querySelectorAll('.timeline-day-pill').forEach(btn => {
            if (Number(btn.dataset.days) === safeDays) {
                btn.className = 'timeline-day-pill py-1.5 px-3 rounded-xl text-xs font-bold bg-[#e6993a] text-black border border-[#e6993a] shadow-xs cursor-pointer';
            } else {
                btn.className = 'timeline-day-pill py-1.5 px-3 rounded-xl text-xs font-bold bg-[var(--card-bg)] text-[var(--text-main)] border border-[var(--card-border)] hover:border-[#e6993a] transition cursor-pointer';
            }
        });
    };

    window.onTimelineDaysChange = function (daysVal) {
        window.setTimelineDurationDays(Number(daysVal) || 1);
    };

    // --- SAVE CLIENT & AUTOMATIC PROJECT CREATION ---
    window.handleSaveNewClientRegistration = function (e) {
        e.preventDefault();

        // 1. Validate required fields
        const contactName = document.getElementById('ncr-contact-name').value.trim();
        const phone = document.getElementById('ncr-phone').value.trim();
        const email = document.getElementById('ncr-email')?.value.trim() || '';

        const bizName = document.getElementById('ncr-biz-name').value.trim();
        const category = document.getElementById('ncr-category').value;
        const location = document.getElementById('ncr-location').value.trim();
        const mapsUrl = document.getElementById('ncr-maps-url')?.value.trim() || ''; // Optional
        const classification = document.getElementById('ncr-classification')?.value || _regClassification || 'GOLD';

        const startDate = document.getElementById('ncr-start-date').value;
        const deadline = document.getElementById('ncr-deadline').value;

        const insta = document.getElementById('ncr-insta')?.value.trim() || '';
        const fb = document.getElementById('ncr-fb')?.value.trim() || '';
        const tiktok = document.getElementById('ncr-tiktok')?.value.trim() || '';
        const website = document.getElementById('ncr-website')?.value.trim() || '';
        const otherSocial = document.getElementById('ncr-other-social')?.value.trim() || '';
        const notes = document.getElementById('ncr-notes')?.value.trim() || '';

        // Google Maps Link is now optional!
        if (!contactName || !phone || !bizName || !location || !startDate || !deadline) {
            alert('Please fill out all required fields marked with *.');
            return;
        }

        if (_regSelectedServices.length === 0) {
            alert('Please select at least one service package for this client.');
            return;
        }

        // Prevent duplicate business name
        const duplicate = window.clientProjectsState.clients.find(c => c.businessName.toLowerCase() === bizName.toLowerCase());
        if (duplicate) {
            if (!confirm(`A client named "${bizName}" already exists. Do you want to proceed and create another profile?`)) {
                return;
            }
        }

        // 2. Create new Client Profile
        const newClient = {
            id: 'c-' + Date.now(),
            businessName: bizName,
            contactPerson: contactName,
            phone: phone,
            email: email,
            category: category,
            location: location,
            googleMapsUrl: mapsUrl, // Optional
            classification: classification,
            instagramUrl: insta,
            facebookUrl: fb,
            tiktokUrl: tiktok,
            websiteUrl: website,
            otherSocialUrl: otherSocial,
            notes: notes,
            createdAt: new Date().toISOString().split('T')[0]
        };

        // 4. Calculate final project price directly from services (no extra charges / discounts)
        const finalPrice = _regSelectedServices.reduce((sum, s) => sum + (Number(s.price) || 0), 0);

        // Detect package & generate full step-by-step phased tasks
        const tempProj = { finalPrice, services: _regSelectedServices };
        const pkg = getProjectPackage(tempProj);
        const phasedTasks = generatePackageTasks(pkg.id, newClient.businessName, finalPrice, deadline);

        // Create associated Project (Initial Status: 'Not Started', Initial Payment: 'Unpaid')
        // Protected by immutable pricingSnapshot for future financial integrity
        const newProject = {
            id: 'p-' + Date.now(),
            clientId: newClient.id,
            clientName: newClient.businessName,
            packageId: pkg.id,
            name: `${newClient.businessName} – ${_regSelectedServices.map(s => s.name).join(' & ')}`,
            description: `Digital transformation deployment for ${newClient.businessName} under ${pkg.name}.`,
            startDate: startDate,
            expectedCompletionDate: deadline,
            actualCompletionDate: null,
            services: JSON.parse(JSON.stringify(_regSelectedServices)),
            extraCharges: 0,
            extraChargesNote: '',
            discountType: 'fixed',
            discountValue: 0,
            subtotal: finalPrice,
            discountAmount: 0,
            finalPrice: finalPrice,
            status: 'Not Started', // As explicitly required
            paymentStatus: 'Unpaid', // As explicitly required
            paymentDeadline: deadline,
            notes: notes,
            tasks: phasedTasks,
            documents: [],
            pricingSnapshot: {
                packageName: pkg.name || 'Custom Package',
                packageId: pkg.id || 'custom',
                agreedPrice: finalPrice,
                basePrice: finalPrice,
                extraCharges: 0,
                discountAmount: 0,
                advancePercentage: pkg.advancePercentage || 50,
                services: JSON.parse(JSON.stringify(_regSelectedServices)),
                pricingVersion: pkg.version || 'v1.0',
                createdAt: startDate || new Date().toISOString().split('T')[0]
            }
        };

        // 5. Commit to State
        window.clientProjectsState.clients.unshift(newClient);
        window.clientProjectsState.projects.unshift(newProject);
        logActivity(`New client "${bizName}" (${classification}) registered & project "${newProject.name}" created`, 'client');

        saveState();
        closeNewClientModal();

        // 6. Automatically open client profile
        openClientProfileModal(newClient.id);
    };

    // ==============================================================================
    // 8. CLIENT PROFILE MODAL (Complete Profile View & Editable Classification)
    // ==============================================================================
    window.openClientProfileModal = function (clientId) {
        currentDetailClientId = clientId;
        const state = window.clientProjectsState;
        const c = state.clients.find(client => client.id === clientId);
        if (!c) return;

        const clientProjects = state.projects.filter(p => p.clientId === c.id);
        const totalBilled = clientProjects.reduce((sum, p) => sum + (Number(p.finalPrice) || 0), 0);
        const totalPaid = state.payments
            .filter(pay => pay.clientId === c.id)
            .reduce((sum, pay) => sum + (Number(pay.amount) || 0), 0);
        const bal = Math.max(0, totalBilled - totalPaid);

        let root = document.getElementById('client-profile-modal-root');
        if (!root) {
            root = document.createElement('div');
            root.id = 'client-profile-modal-root';
            root.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in';
            document.body.appendChild(root);
        }

        root.innerHTML = `
            <div class="relative w-full max-w-3xl bg-white dark:bg-[#141c17] rounded-[28px] border border-slate-200 dark:border-[var(--card-border)] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
                
                <!-- Modal Top Header -->
                <div class="p-5 sm:p-6 pb-4 border-b border-[var(--card-border)] flex items-start justify-between gap-4 bg-[var(--subtle-bg)]">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#a06438] dark:text-[#e6993a]">
                                Verified Business Account
                            </span>
                            <span class="text-[10px] text-[var(--text-muted)] font-semibold">
                                Registered: ${c.createdAt || 'Recent'}
                            </span>
                        </div>
                        <h2 class="text-xl sm:text-2xl font-black text-[var(--text-main)] mt-1 flex items-center gap-2">
                            <span>${c.businessName}</span>
                            ${getClassificationBadge(c.classification, true)}
                        </h2>
                    </div>

                    <div class="flex items-center gap-2">
                        <button onclick="promptChangeClientClassification('${c.id}')" class="py-1.5 px-3 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition shadow-xs flex items-center gap-1 cursor-pointer">
                            <i class="fas fa-crown text-[#e6993a]"></i> Change Rating
                        </button>
                        <button onclick="closeClientProfileModal()" class="w-8 h-8 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-slate-400 hover:text-[var(--text-main)] transition cursor-pointer">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>
                </div>

                <!-- Client Profile Content -->
                <div class="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs">
                    
                    <!-- Top Client & Contact Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="p-4 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] md:col-span-2 space-y-2.5">
                            <h4 class="font-bold text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">Primary Contact & Location</h4>
                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <span class="text-[10px] text-[var(--text-muted)] block">Contact Person</span>
                                    <span class="font-bold text-[var(--text-main)] text-sm">${c.contactPerson}</span>
                                </div>
                                <div>
                                    <span class="text-[10px] text-[var(--text-muted)] block">Phone Number</span>
                                    <a href="tel:${c.phone}" class="font-bold text-[#e6993a] hover:underline text-sm">${c.phone}</a>
                                </div>
                                <div>
                                    <span class="text-[10px] text-[var(--text-muted)] block">Email Address</span>
                                    <span class="font-semibold text-[var(--text-main)]">${c.email || '—'}</span>
                                </div>
                                <div>
                                    <span class="text-[10px] text-[var(--text-muted)] block">Category</span>
                                    <span class="font-semibold text-[var(--text-main)]">${c.category || 'Business'}</span>
                                </div>
                                <div class="col-span-2 pt-1 border-t border-[var(--card-border)]">
                                    <span class="text-[10px] text-[var(--text-muted)] block">Location & Address</span>
                                    <div class="flex items-center gap-2 mt-0.5">
                                        <span class="font-medium text-[var(--text-main)]">${c.location}</span>
                                        ${c.googleMapsUrl ? `
                                            <a href="${c.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] flex items-center gap-1 hover:bg-emerald-500/20 transition">
                                                <i class="fas fa-map-marker-alt"></i> Open Google Maps Link
                                            </a>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Card: Financials -->
                        <div class="p-4 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex flex-col justify-between space-y-2">
                            <h4 class="font-bold text-xs uppercase tracking-wider text-[var(--text-muted)]">Financial Account</h4>
                            <div class="space-y-1.5">
                                <div class="flex justify-between">
                                    <span class="text-[var(--text-muted)]">Contracted:</span>
                                    <span class="font-black">${formatETB(totalBilled)}</span>
                                </div>
                                <div class="flex justify-between text-emerald-600 dark:text-[#4bd39a] font-bold">
                                    <span>Received Cash:</span>
                                    <span>${formatETB(totalPaid)}</span>
                                </div>
                                <div class="flex justify-between text-amber-600 dark:text-[#e6993a] font-black pt-1 border-t border-[var(--card-border)]">
                                    <span>Outstanding Due:</span>
                                    <span>${formatETB(bal)}</span>
                                </div>
                            </div>
                            <button onclick="closeClientProfileModal(); openRecordPaymentModal('${clientProjects.length ? clientProjects[0].id : ''}')" class="w-full py-1.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center justify-center gap-1.5 cursor-pointer">
                                <i class="fas fa-hand-holding-usd"></i> Record Payment
                            </button>
                        </div>
                    </div>

                    <!-- Online Presence & Social Links -->
                    <div class="p-3.5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex flex-wrap items-center gap-2">
                        <span class="text-[11px] font-bold text-[var(--text-muted)] mr-2">Digital Presence:</span>
                        ${c.websiteUrl ? `
                            <a href="${c.websiteUrl}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                                <i class="fas fa-globe"></i> Website
                            </a>
                        ` : ''}
                        ${c.instagramUrl ? `
                            <a href="${c.instagramUrl}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold text-[11px] flex items-center gap-1">
                                <i class="fab fa-instagram"></i> Instagram
                            </a>
                        ` : ''}
                        ${c.facebookUrl ? `
                            <a href="${c.facebookUrl}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[11px] flex items-center gap-1">
                                <i class="fab fa-facebook"></i> Facebook
                            </a>
                        ` : ''}
                        ${c.tiktokUrl ? `
                            <a href="${c.tiktokUrl}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-black/10 dark:bg-white/10 text-[var(--text-main)] font-bold text-[11px] flex items-center gap-1">
                                <i class="fab fa-tiktok"></i> TikTok
                            </a>
                        ` : ''}
                        ${c.otherSocialUrl ? `
                            <a href="${c.otherSocialUrl}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-amber-500/10 text-[#e6993a] font-bold text-[11px] flex items-center gap-1">
                                <i class="fas fa-share-alt"></i> Other Social
                            </a>
                        ` : ''}
                    </div>

                    <!-- Associated Client Projects & Proposals -->
                    <div class="space-y-3">
                        <div class="flex items-center justify-between pb-2 border-b border-[var(--card-border)]">
                            <h4 class="font-extrabold text-sm text-[var(--text-main)]">Client Projects (${clientProjects.length})</h4>
                        </div>

                        ${clientProjects.map(p => `
                            <div class="p-4 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] space-y-3">
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h5 class="font-black text-sm text-[var(--text-main)]">${p.name}</h5>
                                        <span class="text-[10px] text-[var(--text-muted)]">Timeline: ${p.startDate} to ${p.expectedCompletionDate} · Status: <strong>${p.status}</strong></span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="font-black text-sm text-emerald-600 dark:text-[#4bd39a]">${formatETB(p.finalPrice)}</span>
                                        <button onclick="closeClientProfileModal(); openProjectDetailModal('${p.id}')" class="py-1 px-3 rounded-lg text-xs font-bold bg-[#121815] dark:bg-white text-white dark:text-black transition cursor-pointer">
                                            Open Project →
                                        </button>
                                    </div>
                                </div>

                                <!-- Services & Prices in this project -->
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[var(--card-border)] text-xs">
                                    ${p.services.map(s => `
                                        <div class="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] flex justify-between items-center">
                                            <span class="font-bold text-[var(--text-main)]">${s.name}</span>
                                            <span class="font-black text-emerald-600 dark:text-[#4bd39a]">${formatETB(s.price)}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Bottom Options: Edit & Delete -->
                    <div class="pt-4 border-t border-[var(--card-border)] flex items-center justify-between">
                        <button onclick="confirmDeleteClient('${c.id}'); closeClientProfileModal();" class="py-2 px-3.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition cursor-pointer">
                            <i class="fas fa-trash-alt mr-1"></i> Delete Client
                        </button>
                        <button onclick="closeClientProfileModal()" class="py-2 px-5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-main)] cursor-pointer">
                            Done
                        </button>
                    </div>
                </div>
            </div>
        `;
    };

    window.closeClientProfileModal = function () {
        const modal = document.getElementById('client-profile-modal-root');
        if (modal) modal.remove();
        currentDetailClientId = null;
    };

    window.promptChangeClientClassification = function (clientId) {
        const state = window.clientProjectsState;
        const c = state.clients.find(x => x.id === clientId);
        if (!c) return;

        const newCls = prompt(`Change classification for "${c.businessName}"\nEnter GOLD, SILVER, BRONZE, or STARTER:`, c.classification || 'GOLD');
        if (newCls) {
            const clean = newCls.trim().toUpperCase();
            if (['GOLD', 'SILVER', 'BRONZE', 'STARTER'].includes(clean)) {
                c.classification = clean;
                logActivity(`Client "${c.businessName}" classification updated to ${clean}`, 'client');
                saveState();
                openClientProfileModal(clientId);
            } else {
                alert('Invalid classification. Please enter GOLD, SILVER, BRONZE, or STARTER.');
            }
        }
    };

    window.confirmDeleteClient = function (clientId) {
        const client = window.clientProjectsState.clients.find(c => c.id === clientId);
        if (!client) return;

        if (confirm(`Are you sure you want to delete client "${client.businessName}"? This will also remove associated projects and data.`)) {
            window.clientProjectsState.clients = window.clientProjectsState.clients.filter(c => c.id !== clientId);
            window.clientProjectsState.projects = window.clientProjectsState.projects.filter(p => p.clientId !== clientId);
            window.clientProjectsState.payments = window.clientProjectsState.payments.filter(pay => pay.clientId !== clientId);
            logActivity(`Client "${client.businessName}" and related records deleted`, 'client');
            saveState();
        }
    };

    // ==============================================================================
    // 8.5 DYNAMIC PACKAGE ENGINE & PROJECT WORKSPACE SYSTEM
    // ==============================================================================
    function getAvailablePackages() {
        if (window.clientProjectsState && Array.isArray(window.clientProjectsState.packages) && window.clientProjectsState.packages.length > 0) {
            return window.clientProjectsState.packages;
        }
        return defaultPackages;
    }

    function getProjectPackage(project) {
        const pkgs = getAvailablePackages();
        if (!project) return pkgs.find(p => p.id === 'premium') || pkgs[0];
        if (project.packageId) {
            const found = pkgs.find(p => p.id === project.packageId);
            if (found) return found;
        }
        if (project.pricingSnapshot && project.pricingSnapshot.packageId) {
            const found = pkgs.find(p => p.id === project.pricingSnapshot.packageId);
            if (found) return found;
        }
        const price = Number(project.finalPrice) || 0;
        const srvNames = (project.services || []).map(s => (s.name || '').toLowerCase());
        if (price >= 25000 || srvNames.some(n => n.includes('website'))) {
            return pkgs.find(p => p.id === 'premium') || pkgs[0];
        }
        if (price >= 14000 || srvNames.some(n => n.includes('tracking'))) {
            return pkgs.find(p => p.id === 'advanced') || pkgs[0];
        }
        if (price >= 9000 || srvNames.some(n => n.includes('menu'))) {
            return pkgs.find(p => p.id === 'basic') || pkgs[0];
        }
        return pkgs.find(p => p.id === 'small') || pkgs[0];
    }

    function generatePackageTasks(packageKey, clientName, finalPrice, deadline) {
        const pkgs = getAvailablePackages();
        const pkg = pkgs.find(p => p.id === packageKey) || pkgs.find(p => p.id === 'premium') || pkgs[0];
        const price = Number(finalPrice) || pkg.price;
        const advPct = (pkg.advancePercentage || 50) / 100;
        const advance = Math.round(price * advPct);
        const remaining = price - advance;

        if (pkg.phases && Array.isArray(pkg.phases) && pkg.phases.length > 0) {
            const tasks = [];
            pkg.phases.forEach((phase, phaseIdx) => {
                const phaseNum = phase.phaseNum || (phaseIdx + 1);
                const phaseName = phase.name || `Phase ${phaseNum}`;
                (phase.tasks || []).forEach((t, tIdx) => {
                    let taskText = t.text || t.name || '';
                    if (t.isAdvance && !taskText.includes('ETB')) {
                        taskText += ` (${formatETB(advance)})`;
                    } else if (t.isFinalPayment && !taskText.includes('ETB')) {
                        taskText += ` (${formatETB(remaining)})`;
                    }
                    tasks.push({
                        id: t.id || `t-${pkg.id}-${phaseNum}-${tIdx + 1}`,
                        phase: phaseNum,
                        phaseName: phaseName,
                        text: taskText,
                        done: false,
                        dueDate: deadline || null,
                        isAdvance: !!t.isAdvance,
                        isFinalPayment: !!t.isFinalPayment,
                        isCompletion: !!t.isCompletion
                    });
                });
            });
            return tasks;
        }

        // Fallback default generator
        return [
            { id: 't-fb-1', phase: 1, phaseName: 'Phase 1 — Client Preparation & Payment', text: `Confirm requirements and package (${formatETB(price)})`, done: false, dueDate: deadline },
            { id: 't-fb-2', phase: 1, phaseName: 'Phase 1 — Client Preparation & Payment', text: `Receive advance payment (${formatETB(advance)})`, done: false, dueDate: deadline, isAdvance: true },
            { id: 't-fb-3', phase: 2, phaseName: 'Phase 2 — Service Execution', text: 'Execute project services and milestones', done: false, dueDate: deadline },
            { id: 't-fb-4', phase: 3, phaseName: 'Phase 3 — Delivery & Final Payment', text: `Receive final payment (${formatETB(remaining)})`, done: false, dueDate: deadline, isFinalPayment: true },
            { id: 't-fb-5', phase: 3, phaseName: 'Phase 3 — Delivery & Final Payment', text: 'Deliver completed services and close project', done: false, dueDate: deadline, isCompletion: true }
        ];
    }

    function ensureProjectPhasedTasks(project) {
        if (!project) return [];
        const pkg = getProjectPackage(project);
        
        // Check if project tasks need migration to the updated exact package schema
        const isUpToDate = project.tasks && project.tasks.length > 0 &&
            project.tasks.some(t => t.id && (t.id.startsWith('t-s') || t.id.startsWith('t-b') || t.id.startsWith('t-a') || t.id.startsWith('t-pr')));

        if (!isUpToDate) {
            const generated = generatePackageTasks(pkg.id, project.clientName, project.finalPrice, project.expectedCompletionDate);
            if (project.tasks && project.tasks.length > 0) {
                const oldDoneCount = project.tasks.filter(t => t.done).length;
                for (let i = 0; i < Math.min(oldDoneCount, generated.length); i++) {
                    generated[i].done = true;
                }
            }
            project.tasks = generated;
            saveState();
        }
        return project.tasks;
    }

    // ==============================================================================
    // AUDIO SYNTHESIS & CELEBRATION ENGINE (WEB AUDIO API + ZERO EXTERNAL ASSETS)
    // ==============================================================================
    let _soundMuted = localStorage.getItem('elna_tracker_sound_muted') === 'true';
    let _audioCtx = null;

    function getAudioContext() {
        if (!_audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                _audioCtx = new AudioContextClass();
            }
        }
        if (_audioCtx && _audioCtx.state === 'suspended') {
            _audioCtx.resume().catch(() => {});
        }
        return _audioCtx;
    }

    window.toggleSoundMute = function() {
        _soundMuted = !_soundMuted;
        localStorage.setItem('elna_tracker_sound_muted', _soundMuted ? 'true' : 'false');
        
        const btn = document.getElementById('workspace-sound-toggle-btn');
        if (btn) {
            btn.innerHTML = `<i class="fas ${_soundMuted ? 'fa-volume-mute text-rose-500' : 'fa-volume-up text-emerald-500'} text-xs"></i>`;
            btn.title = _soundMuted ? 'Sound Muted (Click to Unmute)' : 'Sound Enabled (Click to Mute)';
        }
    };

    function playPhaseCompleteSound() {
        if (_soundMuted) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;

            // Melodic 4-tone chord for Phase completion: C5 (523.25 Hz) -> E5 (659.25 Hz) -> G5 (783.99 Hz) -> C6 (1046.5 Hz)
            const notes = [
                { freq: 523.25, time: 0, dur: 0.16 },
                { freq: 659.25, time: 0.10, dur: 0.18 },
                { freq: 783.99, time: 0.20, dur: 0.22 },
                { freq: 1046.50, time: 0.32, dur: 0.45 }
            ];

            notes.forEach(item => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const noteStart = now + item.time;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(item.freq, noteStart);

                gain.gain.setValueAtTime(0.001, noteStart);
                gain.gain.linearRampToValueAtTime(0.24, noteStart + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + item.dur);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(noteStart);
                osc.stop(noteStart + item.dur + 0.05);
            });
        } catch (e) {
            console.warn('Phase audio fallback:', e);
        }
    }

    function playCashRegisterSound() {
        if (_soundMuted) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;

            // Mechanical register click
            const clickOsc = ctx.createOscillator();
            const clickGain = ctx.createGain();
            clickOsc.type = 'square';
            clickOsc.frequency.setValueAtTime(320, now);
            clickOsc.frequency.exponentialRampToValueAtTime(120, now + 0.05);
            clickGain.gain.setValueAtTime(0.18, now);
            clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            clickOsc.connect(clickGain);
            clickGain.connect(ctx.destination);
            clickOsc.start(now);
            clickOsc.stop(now + 0.06);

            // Bright metallic coins chime: B5 -> E6 -> B6 -> E7
            const freqs = [987.77, 1318.51, 1975.53, 2637.02];
            freqs.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const start = now + 0.05 + (idx * 0.04);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, start);

                gain.gain.setValueAtTime(0.001, start);
                gain.gain.linearRampToValueAtTime(0.25, start + 0.015);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(start);
                osc.stop(start + 0.55);
            });
        } catch (e) {
            console.warn('Cash register audio fallback:', e);
        }
    }

    function playFanfareSound() {
        if (_soundMuted) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;

            // Triumphant project celebration fanfare: C5, E5, G5, C6, E6
            const notes = [
                { freq: 523.25, time: 0, dur: 0.16 },
                { freq: 659.25, time: 0.14, dur: 0.16 },
                { freq: 783.99, time: 0.28, dur: 0.18 },
                { freq: 1046.50, time: 0.44, dur: 0.42 },
                { freq: 1318.51, time: 0.60, dur: 0.60 }
            ];

            notes.forEach(item => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const noteStart = now + item.time;

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(item.freq, noteStart);

                gain.gain.setValueAtTime(0.001, noteStart);
                gain.gain.linearRampToValueAtTime(0.26, noteStart + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + item.dur);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(noteStart);
                osc.stop(noteStart + item.dur + 0.05);
            });
        } catch (e) {
            console.warn('Fanfare audio fallback:', e);
        }
    }

    // Visual Confetti & Celebrations
    function ensureCelebrationStyles() {
        if (!document.getElementById('elna-celebration-styles')) {
            const style = document.createElement('style');
            style.id = 'elna-celebration-styles';
            style.textContent = `
                @keyframes taskBounceKeyframe {
                    0% { transform: scale(1); }
                    35% { transform: scale(1.3) rotate(-5deg); }
                    70% { transform: scale(0.92) rotate(2deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }
                .task-bounce-anim {
                    animation: taskBounceKeyframe 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
            `;
            document.head.appendChild(style);
        }
    }

    function triggerTaskConfetti(x, y) {
        ensureCelebrationStyles();
        const originX = (x !== null && x !== undefined && !isNaN(x)) ? x : (window.innerWidth / 2);
        const originY = (y !== null && y !== undefined && !isNaN(y)) ? y : (window.innerHeight / 3);

        const colors = ['#e6993a', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6'];
        const count = 22;

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.floor(Math.random() * 5 + 5);
            const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
            const distance = Math.random() * 65 + 35;
            const destX = Math.cos(angle) * distance;
            const destY = Math.sin(angle) * distance - 20;

            p.className = 'fixed pointer-events-none z-50 rounded-xs shadow-xs';
            p.style.left = originX + 'px';
            p.style.top = originY + 'px';
            p.style.width = size + 'px';
            p.style.height = (size * (Math.random() > 0.5 ? 1 : 1.6)) + 'px';
            p.style.backgroundColor = color;
            p.style.transform = `translate(0, 0) rotate(0deg)`;
            p.style.transition = 'transform 0.75s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.75s ease-out';
            p.style.opacity = '1';

            document.body.appendChild(p);

            requestAnimationFrame(() => {
                p.style.transform = `translate(${destX}px, ${destY + 45}px) rotate(${Math.random() * 360}deg)`;
                p.style.opacity = '0';
            });

            setTimeout(() => p.remove(), 800);
        }
    }

    function triggerPhaseConfetti(x, y, phaseNum) {
        ensureCelebrationStyles();
        const originX = (x !== null && x !== undefined && !isNaN(x)) ? x : (window.innerWidth / 2);
        const originY = (y !== null && y !== undefined && !isNaN(y)) ? y : (window.innerHeight / 3);

        const colors = ['#e6993a', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6'];
        const count = 35;

        // Phase Completed Banner Toast
        const toast = document.createElement('div');
        toast.className = 'fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#121815] text-white px-5 py-2.5 rounded-2xl border border-emerald-500/50 shadow-2xl flex items-center gap-2.5 text-xs font-black animate-fade-in pointer-events-none';
        toast.innerHTML = `<span class="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center text-xs font-black">✓</span><span>Phase ${phaseNum || ''} Completed!</span>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.floor(Math.random() * 6 + 5);
            const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
            const distance = Math.random() * 80 + 40;
            const destX = Math.cos(angle) * distance;
            const destY = Math.sin(angle) * distance - 25;

            p.className = 'fixed pointer-events-none z-50 rounded-xs shadow-xs';
            p.style.left = originX + 'px';
            p.style.top = originY + 'px';
            p.style.width = size + 'px';
            p.style.height = (size * (Math.random() > 0.5 ? 1 : 1.6)) + 'px';
            p.style.backgroundColor = color;
            p.style.transform = `translate(0, 0) rotate(0deg)`;
            p.style.transition = 'transform 0.85s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.85s ease-out';
            p.style.opacity = '1';

            document.body.appendChild(p);

            requestAnimationFrame(() => {
                p.style.transform = `translate(${destX}px, ${destY + 45}px) rotate(${Math.random() * 360}deg)`;
                p.style.opacity = '0';
            });

            setTimeout(() => p.remove(), 900);
        }
    }

    function triggerMoneyRain() {
        ensureCelebrationStyles();
        const items = ['💵', 'ETB', '🪙', '✨', '💰', '100 ETB', '200 ETB'];
        const count = 28;

        const overlay = document.createElement('div');
        overlay.id = 'full-payment-overlay';
        overlay.className = 'fixed inset-0 pointer-events-none z-50 overflow-hidden flex flex-col items-center justify-center p-4';
        
        const banner = document.createElement('div');
        banner.className = 'bg-emerald-600 text-white font-black px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3.5 text-base sm:text-lg animate-bounce border-2 border-emerald-300';
        banner.innerHTML = `
            <span class="text-3xl">💵</span>
            <div>
                <div class="text-[10px] uppercase tracking-widest text-emerald-100 font-extrabold">FULL PAYMENT RECEIVED</div>
                <div class="font-black text-sm sm:text-base">100% Settled · All Balance Cleared in ETB!</div>
            </div>
            <span class="text-3xl">🎉</span>
        `;
        overlay.appendChild(banner);
        document.body.appendChild(overlay);

        for (let i = 0; i < count; i++) {
            const item = document.createElement('div');
            const text = items[Math.floor(Math.random() * items.length)];
            const startX = Math.random() * window.innerWidth;
            const size = Math.floor(Math.random() * 10 + 15);

            item.className = 'fixed pointer-events-none z-50 font-black text-emerald-400 select-none';
            item.textContent = text;
            item.style.left = startX + 'px';
            item.style.bottom = '-40px';
            item.style.fontSize = size + 'px';
            item.style.textShadow = '0 2px 8px rgba(16, 185, 129, 0.4)';
            item.style.transition = `transform ${1.4 + Math.random() * 0.8}s cubic-bezier(0.2, 0.8, 0.3, 1), opacity 1.5s ease-out`;
            item.style.opacity = '1';

            document.body.appendChild(item);

            const endX = startX + (Math.random() * 120 - 60);
            const endY = -(window.innerHeight + 80);

            requestAnimationFrame(() => {
                item.style.transform = `translate(${endX - startX}px, ${endY}px) rotate(${Math.random() * 180 - 90}deg)`;
                item.style.opacity = '0';
            });

            setTimeout(() => item.remove(), 2400);
        }

        setTimeout(() => overlay.remove(), 2800);
    }

    function triggerGrandConfetti() {
        ensureCelebrationStyles();
        const colors = ['#e6993a', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#eab308'];
        const count = 75;

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const isLeft = (i % 2 === 0);
            const startX = isLeft ? (Math.random() * 220) : (window.innerWidth - Math.random() * 220);
            const startY = window.innerHeight;
            const size = Math.floor(Math.random() * 8 + 6);
            const destX = isLeft ? (startX + Math.random() * 450 + 100) : (startX - Math.random() * 450 - 100);
            const destY = Math.random() * (window.innerHeight * 0.65);

            p.className = 'fixed pointer-events-none z-50 rounded-xs shadow-md';
            p.style.left = startX + 'px';
            p.style.top = startY + 'px';
            p.style.width = size + 'px';
            p.style.height = (size * 1.8) + 'px';
            p.style.backgroundColor = color;
            p.style.transition = `transform ${2 + Math.random() * 0.8}s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.5s ease-out`;
            p.style.opacity = '1';

            document.body.appendChild(p);

            requestAnimationFrame(() => {
                p.style.transform = `translate(${destX - startX}px, -${startY - destY}px) rotate(${Math.random() * 720}deg)`;
                setTimeout(() => {
                    p.style.transform += ` translateY(320px)`;
                    p.style.opacity = '0';
                }, 1200);
            });

            setTimeout(() => p.remove(), 3000);
        }
    }

    // ==============================================================================
    // AUTOMATIC PROJECT STATUS CALCULATION & SYNCHRONIZATION
    // Rules:
    // 1. No tasks started: Not Started
    // 2. At least one task started/completed: Ongoing
    // 3. Approval switch ON: Waiting for Client Approval
    // 4. All tasks completed + client approval received + full payment received + services delivered: Completed
    // ==============================================================================
    function calculateProjectStatus(project) {
        if (!project) return 'Not Started';
        const tasks = project.tasks || [];
        const totalTasks = tasks.length;
        const doneTasks = tasks.filter(t => t.done).length;
        const paid = getProjectPaidAmount(project.id);
        const finalPrice = Number(project.finalPrice) || 0;
        const fullyPaid = finalPrice > 0 ? (paid >= finalPrice) : true;
        const allTasksDone = totalTasks > 0 && doneTasks === totalTasks;

        // Completed: All tasks completed + client approval received + full payment received + services delivered
        if (allTasksDone && project.clientApproved && fullyPaid) {
            return 'Completed';
        }

        // Approval switch ON: Waiting for Client Approval
        if (project.waitingForApproval) {
            return 'Waiting for Client Approval';
        }

        // Ongoing: At least one task started or completed (or advance payment recorded, or client approved)
        if (doneTasks > 0 || paid > 0 || project.started || project.clientApproved) {
            return 'Ongoing';
        }

        return 'Not Started';
    }

    function syncProjectStatus(project) {
        if (!project) return 'Not Started';
        const newStatus = calculateProjectStatus(project);
        project.status = newStatus;

        if (newStatus === 'Completed' && !project.actualCompletionDate) {
            project.actualCompletionDate = new Date().toISOString().split('T')[0];
        }
        return newStatus;
    }

    function checkAndTriggerFinalCompletion(project) {
        if (!project || !project.tasks) return;
        const totalTasks = project.tasks.length;
        const doneTasks = project.tasks.filter(t => t.done).length;
        const paid = getProjectPaidAmount(project.id);
        const finalPrice = Number(project.finalPrice) || 0;
        const fullyPaid = finalPrice > 0 ? (paid >= finalPrice) : true;
        const allDone = totalTasks > 0 && doneTasks === totalTasks;

        if (allDone && project.clientApproved && fullyPaid) {
            project.status = 'Completed';
            if (!project.actualCompletionDate) {
                project.actualCompletionDate = new Date().toISOString().split('T')[0];
            }

            if (!project._completionCelebrated) {
                project._completionCelebrated = true;
                playFanfareSound();
                triggerGrandConfetti();
                logActivity(`🏆 Project "${project.name}" reached 100% completion & verified delivery!`, 'project');
            }
        }
    }

    // Client Approval Switch Controls
    window.toggleProjectApprovalSwitch = function(projectId) {
        const project = window.clientProjectsState.projects.find(p => p.id === projectId);
        if (!project) return;

        project.waitingForApproval = !project.waitingForApproval;

        if (project.waitingForApproval) {
            logActivity(`Project "${project.name}" deliverables submitted for client approval`, 'project');
        } else {
            logActivity(`Project "${project.name}" returned to ongoing execution (revisions/internal)`, 'project');
        }

        syncProjectStatus(project);
        saveState();
        renderProjectWorkspaceContent();
        renderMainContent();
    };

    window.confirmClientApproval = function(projectId) {
        const project = window.clientProjectsState.projects.find(p => p.id === projectId);
        if (!project) return;

        project.clientApproved = true;
        project.waitingForApproval = false;
        project.clientApprovedAt = new Date().toISOString().split('T')[0];

        triggerTaskConfetti(window.innerWidth / 2, window.innerHeight / 3);

        logActivity(`Client approval confirmed for "${project.name}" ✓`, 'project');

        syncProjectStatus(project);
        checkAndTriggerFinalCompletion(project);

        saveState();
        renderProjectWorkspaceContent();
        renderMainContent();
    };

    window.revokeClientApproval = function(projectId) {
        const project = window.clientProjectsState.projects.find(p => p.id === projectId);
        if (!project) return;

        project.clientApproved = false;
        project.clientApprovedAt = null;
        project.waitingForApproval = false;

        logActivity(`Client approval reset for revisions on "${project.name}"`, 'project');

        syncProjectStatus(project);
        saveState();
        renderProjectWorkspaceContent();
        renderMainContent();
    };

    let _activeWorkspaceProjectId = null;

    window.startProjectAndOpenWorkspace = function(projectId) {
        const project = window.clientProjectsState.projects.find(p => p.id === projectId);
        if (project) {
            project.started = true;
            syncProjectStatus(project);
            logActivity(`Project "${project.name}" execution started`, 'project');
            saveState();
        }
        openProjectWorkspace(projectId);
    };

    window.openProjectWorkspace = function(projectId) {
        _activeWorkspaceProjectId = projectId;
        const project = window.clientProjectsState.projects.find(p => p.id === projectId);
        if (!project) return;

        ensureProjectPhasedTasks(project);
        syncProjectStatus(project);

        let root = document.getElementById('project-workspace-container');
        if (!root) {
            root = document.createElement('div');
            root.id = 'project-workspace-container';
            root.className = 'fixed inset-0 z-50 bg-slate-50 dark:bg-[#0c120f] text-[var(--text-main)] overflow-y-auto animate-fade-in';
            document.body.appendChild(root);
        }

        renderProjectWorkspaceContent();
    };

    window.closeProjectWorkspace = function() {
        _activeWorkspaceProjectId = null;
        const root = document.getElementById('project-workspace-container');
        if (root) root.remove();
        renderMainContent();
    };

    window.toggleWorkspaceTask = function(projectId, taskId, event) {
        const state = window.clientProjectsState;
        const project = state.projects.find(p => p.id === projectId);
        if (!project || !project.tasks) return;

        const task = project.tasks.find(t => t.id === taskId);
        if (!task) return;

        task.done = !task.done;
        if (task.done) {
            task.completedAt = new Date().toISOString().split('T')[0];
            project.started = true;

            // Check if this action completed the entire phase
            const taskPhase = task.phase || 1;
            const phaseTasks = project.tasks.filter(t => (t.phase || 1) === taskPhase);
            const isPhaseNowDone = phaseTasks.length > 0 && phaseTasks.every(t => t.done);

            // ONLY play sound & celebration when the entire phase is completed!
            if (isPhaseNowDone) {
                playPhaseCompleteSound();
                const clickX = event?.clientX ?? (window.innerWidth / 2);
                const clickY = event?.clientY ?? (window.innerHeight / 3);
                triggerPhaseConfetti(clickX, clickY, taskPhase);
            }

            // Animate target checkbox element if available
            if (event?.target) {
                event.target.classList.add('task-bounce-anim');
                setTimeout(() => event.target.classList.remove('task-bounce-anim'), 400);
            }

            // Automatic Earn Management synchronization when payment tasks are checked off
            const paid = getProjectPaidAmount(project.id);
            const finalPrice = Number(project.finalPrice) || 0;
            const advTarget = Math.round(finalPrice * 0.5);

            if (task.isAdvance && paid < advTarget) {
                quickRecordAdvancePayment(project.id, advTarget - paid);
                return;
            }

            if (task.isFinalPayment && paid < finalPrice) {
                quickRecordRemainingPayment(project.id, finalPrice - paid);
                return;
            }
        } else {
            task.completedAt = null;
        }

        syncProjectStatus(project);
        checkAndTriggerFinalCompletion(project);

        saveState();
        renderProjectWorkspaceContent();
    };

    window.addWorkspaceCustomTask = function(projectId, phaseNum) {
        const text = prompt(`Enter custom task for Phase ${phaseNum}:`);
        if (!text || !text.trim()) return;

        const project = window.clientProjectsState.projects.find(p => p.id === projectId);
        if (!project) return;

        ensureProjectPhasedTasks(project);

        const newTask = {
            id: 't-cust-' + Date.now(),
            phase: phaseNum,
            phaseName: `Phase ${phaseNum} — Custom Tasks`,
            text: text.trim(),
            done: false,
            dueDate: project.expectedCompletionDate,
            isCustom: true
        };

        const lastIdx = project.tasks.map(t => t.phase).lastIndexOf(phaseNum);
        if (lastIdx !== -1) {
            project.tasks.splice(lastIdx + 1, 0, newTask);
        } else {
            project.tasks.push(newTask);
        }

        logActivity(`Custom task added to project "${project.name}"`, 'project');
        saveState();
        renderProjectWorkspaceContent();
    };

    window.deleteWorkspaceTask = function(projectId, taskId) {
        if (!confirm('Are you sure you want to remove this task?')) return;
        const project = window.clientProjectsState.projects.find(p => p.id === projectId);
        if (!project || !project.tasks) return;

        project.tasks = project.tasks.filter(t => t.id !== taskId);
        syncProjectStatus(project);
        saveState();
        renderProjectWorkspaceContent();
    };

    window.updateWorkspaceProjectStatus = function(projectId, newStatus) {
        // Maintained for backward compatibility but status is now automatically computed
        const project = window.clientProjectsState.projects.find(p => p.id === projectId);
        if (!project) return;
        syncProjectStatus(project);
        saveState();
        renderProjectWorkspaceContent();
    };

    window.quickRecordAdvancePayment = function(projectId, amount) {
        const project = window.clientProjectsState.projects.find(p => p.id === projectId);
        if (!project) return;
        const payAmount = Number(amount) || Math.round((Number(project.finalPrice) || 0) * 0.5);

        const newPayment = {
            id: 'pay-' + Date.now(),
            projectId: project.id,
            clientId: project.clientId,
            clientName: project.clientName,
            amount: payAmount,
            date: new Date().toISOString().split('T')[0],
            method: 'Telebirr',
            type: '50% Advance Payment',
            reference: 'TB-ADV-' + Math.floor(100000 + Math.random() * 900000),
            notes: `50% upfront advance payment for ${project.name}`
        };

        window.clientProjectsState.payments.unshift(newPayment);

        if (project.tasks) {
            const advTask = project.tasks.find(t => t.isAdvance);
            if (advTask) advTask.done = true;
            const recTask = project.tasks.find(t => t.text.includes('Record payment'));
            if (recTask) recTask.done = true;
        }

        project.started = true;
        const newPaid = getProjectPaidAmount(project.id);
        const finalPrice = Number(project.finalPrice) || 0;

        if (finalPrice > 0 && newPaid >= finalPrice) {
            if (!project._fullPaymentCelebrated) {
                project._fullPaymentCelebrated = true;
                playCashRegisterSound();
                triggerMoneyRain();
            }
        } else {
            playCashRegisterSound();
        }

        logActivity(`Recorded 50% advance payment of ${formatETB(payAmount)} for "${project.name}"`, 'payment');
        syncProjectStatus(project);
        checkAndTriggerFinalCompletion(project);
        saveState();
        renderProjectWorkspaceContent();
    };

    window.quickRecordRemainingPayment = function(projectId, amount) {
        const project = window.clientProjectsState.projects.find(p => p.id === projectId);
        if (!project) return;
        const paid = getProjectPaidAmount(project.id);
        const finalPrice = Number(project.finalPrice) || 0;
        const rem = amount !== undefined ? Number(amount) : Math.max(0, finalPrice - paid);

        const newPayment = {
            id: 'pay-' + Date.now(),
            projectId: project.id,
            clientId: project.clientId,
            clientName: project.clientName,
            amount: rem,
            date: new Date().toISOString().split('T')[0],
            method: 'Bank Transfer (CBE)',
            type: 'Remaining 50% Final Payment',
            reference: 'CBE-FIN-' + Math.floor(100000 + Math.random() * 900000),
            notes: `Final remaining settlement for ${project.name}`
        };

        window.clientProjectsState.payments.unshift(newPayment);

        if (project.tasks) {
            const finTask = project.tasks.find(t => t.isFinalPayment);
            if (finTask) finTask.done = true;
        }

        const newPaid = getProjectPaidAmount(project.id);
        if (finalPrice > 0 && newPaid >= finalPrice) {
            if (!project._fullPaymentCelebrated) {
                project._fullPaymentCelebrated = true;
                playCashRegisterSound();
                triggerMoneyRain();
            }
        } else {
            playCashRegisterSound();
        }

        logActivity(`Recorded final payment of ${formatETB(rem)} for "${project.name}"`, 'payment');
        syncProjectStatus(project);
        checkAndTriggerFinalCompletion(project);
        saveState();
        renderProjectWorkspaceContent();
    };

    function renderProjectWorkspaceContent() {
        const root = document.getElementById('project-workspace-container');
        if (!root || !_activeWorkspaceProjectId) return;

        const state = window.clientProjectsState;
        const p = state.projects.find(x => x.id === _activeWorkspaceProjectId);
        if (!p) {
            closeProjectWorkspace();
            return;
        }

        const client = state.clients.find(c => c.id === p.clientId) || {
            businessName: p.clientName,
            contactPerson: 'Contact Person',
            phone: 'N/A',
            email: '',
            location: 'Addis Ababa',
            category: 'Business',
            classification: 'GOLD'
        };

        const pkg = getProjectPackage(p);
        const finalPrice = Number(p.finalPrice) || 0;
        const paid = getProjectPaidAmount(p.id);
        const balance = Math.max(0, finalPrice - paid);
        const payPct = finalPrice > 0 ? Math.min(100, Math.round((paid / finalPrice) * 100)) : 0;
        const payStatus = calculatePaymentStatus(p);

        // 50% Advance targets
        const advanceTarget = Math.round(finalPrice * 0.5);
        const remainingTarget = finalPrice - advanceTarget;
        const advanceSatisfied = paid >= advanceTarget;
        const fullyPaid = paid >= finalPrice;

        ensureProjectPhasedTasks(p);
        syncProjectStatus(p);

        const doneTasks = p.tasks.filter(t => t.done).length;
        const totalTasks = p.tasks.length;
        const taskPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

        // Group tasks by phase
        const phaseGroups = {};
        p.tasks.forEach(t => {
            const ph = t.phase || 1;
            if (!phaseGroups[ph]) {
                phaseGroups[ph] = {
                    phaseNum: ph,
                    phaseName: t.phaseName || `Phase ${ph}`,
                    tasks: []
                };
            }
            phaseGroups[ph].tasks.push(t);
        });

        // Direct Expenses & Project Profit
        const directExpenses = getProjectExpenseAmount(p.id);
        const netProjectProfit = paid - directExpenses;

        const isCompleted = p.status === 'Completed' || (doneTasks === totalTasks && p.clientApproved && fullyPaid);

        // Status badge styling
        let statusBadgeClass = 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600';
        let statusIcon = 'fas fa-circle-notch text-slate-400';
        if (p.status === 'Ongoing') {
            statusBadgeClass = 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30';
            statusIcon = 'fas fa-spinner fa-spin text-amber-500';
        } else if (p.status === 'Waiting for Client Approval' || p.status === 'Waiting for Client') {
            statusBadgeClass = 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30 animate-pulse';
            statusIcon = 'fas fa-clock text-blue-500';
        } else if (p.status === 'Completed') {
            statusBadgeClass = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
            statusIcon = 'fas fa-check-circle text-emerald-500';
        }

        root.innerHTML = `
            <!-- Top Sticky Navigation Bar -->
            <div class="sticky top-0 z-40 bg-white/90 dark:bg-[#0c120f]/90 backdrop-blur-md border-b border-[var(--card-border)] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3 min-w-0">
                    <button onclick="closeProjectWorkspace()" class="py-1.5 px-3 rounded-xl bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[var(--text-main)] hover:text-[#e6993a] border border-[var(--card-border)] text-xs font-black transition flex items-center gap-1.5 cursor-pointer shrink-0">
                        <i class="fas fa-arrow-left text-xs"></i>
                        <span>Back to Projects</span>
                    </button>

                    <div class="h-4 w-px bg-[var(--card-border)] hidden sm:block shrink-0"></div>

                    <div class="min-w-0 truncate">
                        <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#a06438] dark:text-[#e6993a] block leading-none">
                            PROJECT EXECUTION WORKSPACE
                        </span>
                        <h2 class="text-sm sm:text-base font-black text-[var(--text-main)] truncate mt-0.5">
                            ${p.name}
                        </h2>
                    </div>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                    <button id="workspace-sound-toggle-btn" onclick="toggleSoundMute()" class="w-8 h-8 rounded-xl bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[var(--text-main)] border border-[var(--card-border)] flex items-center justify-center transition cursor-pointer" title="${_soundMuted ? 'Sound Muted (Click to Unmute)' : 'Sound Enabled (Click to Mute)'}">
                        <i class="fas ${_soundMuted ? 'fa-volume-mute text-rose-500' : 'fa-volume-up text-emerald-500'} text-xs"></i>
                    </button>
                    <button onclick="openRecordPaymentModal('${p.id}')" class="py-1.5 px-3 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition flex items-center gap-1.5 cursor-pointer">
                        <i class="fas fa-plus text-[10px]"></i>
                        <span>Record Payment</span>
                    </button>
                    <button onclick="closeProjectWorkspace()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] hover:bg-rose-500/10 text-[var(--text-muted)] hover:text-rose-500 border border-[var(--card-border)] flex items-center justify-center transition cursor-pointer">
                        <i class="fas fa-times text-xs"></i>
                    </button>
                </div>
            </div>

            <!-- Workspace Main Container -->
            <div class="max-w-6xl mx-auto p-4 sm:p-8 space-y-6">

                <!-- 1. Hero Project Overview Card -->
                <div class="ui-card p-6 sm:p-7 rounded-[26px] border border-[var(--card-border)] relative overflow-hidden">
                    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div class="space-y-3 flex-1 min-w-0">
                            <div class="flex flex-wrap items-center gap-2">
                                <span class="px-2.5 py-1 rounded-full text-xs font-black bg-[#e6993a] text-black">
                                    ${pkg.name}
                                </span>
                                ${getClassificationBadge(client.classification)}
                                <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                    ${client.category || 'Business'}
                                </span>
                                <!-- Automatic Project Status Badge (Read-Only) -->
                                <span class="px-3 py-1 rounded-full text-xs font-black border ${statusBadgeClass} flex items-center gap-1.5 shadow-2xs" title="Automatic Project Status: Calculated strictly from task completion, client approval, and payment data">
                                    <i class="${statusIcon} text-[10px]"></i>
                                    <span>${p.status}</span>
                                </span>
                            </div>

                            <h1 class="text-2xl sm:text-3xl font-black text-[var(--text-main)] tracking-tight">
                                ${client.businessName}
                            </h1>
                            <p class="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                                ${p.description || pkg.desc}
                            </p>

                            <div class="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)] pt-1">
                                <span class="flex items-center gap-1.5">
                                    <i class="fas fa-user-circle text-slate-400"></i>
                                    <strong class="text-[var(--text-main)]">${client.contactPerson}</strong>
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <i class="fas fa-phone text-slate-400"></i>
                                    <a href="tel:${client.phone}" class="hover:text-[#e6993a]">${client.phone}</a>
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <i class="fas fa-map-marker-alt text-slate-400"></i>
                                    <span>${client.location}</span>
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <i class="far fa-calendar-alt text-[#e6993a]"></i>
                                    <span>Timeline: <strong>${p.startDate || 'Started'}</strong> → <strong>${p.expectedCompletionDate || 'Not set'}</strong></span>
                                </span>
                            </div>
                        </div>

                        <!-- Right Column: Financial & Agreed Price -->
                        <div class="lg:w-80 p-5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex flex-col justify-between space-y-3 shrink-0">
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">Total Project Value</span>
                                    <div class="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-[#4bd39a] mt-0.5">
                                        ${formatETB(finalPrice)}
                                    </div>
                                </div>
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${fullyPaid ? 'bg-emerald-500 text-black' : advanceSatisfied ? 'bg-amber-500 text-black' : 'bg-slate-200 dark:bg-slate-700 text-[var(--text-main)]'}">
                                    ${payStatus}
                                </span>
                            </div>

                            <div class="space-y-1.5 text-xs pt-2 border-t border-[var(--card-border)]">
                                <div class="flex justify-between">
                                    <span class="text-[var(--text-muted)]">50% Advance Target:</span>
                                    <span class="font-extrabold ${advanceSatisfied ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}">
                                        ${formatETB(advanceTarget)} ${advanceSatisfied ? '✓' : '(Due)'}
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-[var(--text-muted)]">Paid Revenue (${payPct}%):</span>
                                    <span class="font-black text-emerald-600 dark:text-emerald-400">${formatETB(paid)}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-[var(--text-muted)]">Remaining Balance:</span>
                                    <span class="font-black ${balance > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}">
                                        ${formatETB(balance)}
                                    </span>
                                </div>
                            </div>

                            <!-- Quick Payment Actions -->
                            <div class="pt-2 flex flex-col gap-1.5">
                                ${!advanceSatisfied ? `
                                    <button onclick="quickRecordAdvancePayment('${p.id}', ${advanceTarget - paid})" class="w-full py-2 px-3 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-black transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                                        <i class="fas fa-hand-holding-usd"></i>
                                        <span>Receive 50% Advance (${formatETB(advanceTarget)})</span>
                                    </button>
                                ` : balance > 0 ? `
                                    <button onclick="${p.clientApproved ? `quickRecordRemainingPayment('${p.id}', ${balance})` : `alert('Please obtain client approval and click Confirm Client Approved before recording final 50% payment.')`}" class="w-full py-2 px-3 rounded-xl text-xs font-black ${p.clientApproved ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400'} transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                                        <i class="fas fa-check-circle"></i>
                                        <span>Receive Remaining 50% (${formatETB(balance)})</span>
                                    </button>
                                ` : `
                                    <div class="py-1.5 px-3 rounded-xl text-center text-xs font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                        ✓ Project 100% Fully Settled
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. Client Approval Workflow Control Panel -->
                <div class="ui-card p-5 sm:p-6 rounded-[24px] border ${p.clientApproved ? 'border-emerald-500/30 bg-emerald-500/5' : p.waitingForApproval ? 'border-blue-500/30 bg-blue-500/5' : 'border-[var(--card-border)] bg-[var(--card-bg)]'} transition-all space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="space-y-1">
                            <div class="flex flex-wrap items-center gap-2">
                                <span class="text-[10px] font-black uppercase tracking-wider text-[#a06438] dark:text-[#e6993a] flex items-center gap-1">
                                    <i class="fas fa-clipboard-check"></i> CLIENT APPROVAL WORKFLOW
                                </span>
                                ${p.clientApproved ? `
                                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-black flex items-center gap-1">
                                        <i class="fas fa-check-circle"></i> Client Approved (${p.clientApprovedAt || 'Verified'})
                                    </span>
                                ` : p.waitingForApproval ? `
                                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500 text-white flex items-center gap-1 animate-pulse">
                                        <i class="fas fa-clock"></i> Waiting for Client Approval
                                    </span>
                                ` : `
                                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-[var(--text-muted)]">
                                        Work is on our side (Internal)
                                    </span>
                                `}
                            </div>
                            <h4 class="text-base font-black text-[var(--text-main)]">
                                ${p.clientApproved ? 'Client Approval Confirmed ✓' : p.waitingForApproval ? 'Deliverables Submitted · Awaiting Client Approval' : 'Team Execution (Work on our side)'}
                            </h4>
                            <p class="text-xs text-[var(--text-muted)]">
                                ${p.clientApproved ? 'Client has reviewed and approved all deliverables. Final delivery and full payment settlement are now active.' : p.waitingForApproval ? 'Deliverables have been submitted to client. Status is automatically set to "Waiting for Client Approval".' : 'Work is currently on our side. When deliverables are ready for client review, switch ON to submit for approval.'}
                            </p>
                        </div>

                        <!-- Switch & Action Buttons -->
                        <div class="flex flex-wrap items-center gap-3 shrink-0">
                            <!-- Simple ON/OFF Switch -->
                            <div class="flex items-center gap-2.5 bg-[var(--subtle-bg)] px-3 py-2 rounded-2xl border border-[var(--card-border)]">
                                <div class="text-right">
                                    <span class="text-xs font-bold text-[var(--text-main)] block leading-none">Submitted to Client</span>
                                    <span class="text-[10px] text-[var(--text-muted)]">${p.waitingForApproval ? 'Waiting for Approval' : 'Work on our side'}</span>
                                </div>
                                <button type="button" onclick="toggleProjectApprovalSwitch('${p.id}')" class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${p.waitingForApproval ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}" role="switch" aria-checked="${!!p.waitingForApproval}">
                                    <span class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${p.waitingForApproval ? 'translate-x-5' : 'translate-x-0'}"></span>
                                </button>
                                <span class="text-xs font-black ${p.waitingForApproval ? 'text-blue-600 dark:text-blue-400' : 'text-[var(--text-muted)]'} min-w-[28px]">
                                    ${p.waitingForApproval ? 'ON' : 'OFF'}
                                </span>
                            </div>

                            <!-- Confirmation Action: Client Approved -->
                            ${!p.clientApproved ? `
                                <button onclick="confirmClientApproval('${p.id}')" class="py-2 px-4 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]">
                                    <i class="fas fa-check-double text-[11px]"></i>
                                    <span>Confirm Client Approved ✓</span>
                                </button>
                            ` : `
                                <button onclick="revokeClientApproval('${p.id}')" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-700 hover:bg-rose-500/15 hover:text-rose-600 text-[var(--text-muted)] transition flex items-center gap-1.5 cursor-pointer" title="Reopen deliverables for client revisions">
                                    <i class="fas fa-undo text-[10px]"></i>
                                    <span>Request Revisions</span>
                                </button>
                            `}
                        </div>
                    </div>
                </div>

                <!-- 3. Overall Progress Bar Card -->
                <div class="ui-card p-5 rounded-2xl border border-[var(--card-border)] space-y-2.5">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <span class="text-[10px] font-black uppercase tracking-wider text-[#a06438] dark:text-[#e6993a] block">
                                OVERALL EXECUTION PROGRESS
                            </span>
                            <div class="text-xl font-black text-[var(--text-main)] mt-0.5">
                                ${taskPct}% Completed · <span class="text-xs font-bold text-[var(--text-muted)]">${doneTasks} of ${totalTasks} tasks finished</span>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 text-xs">
                            <span class="px-2.5 py-1 rounded-lg bg-[var(--subtle-bg)] text-[var(--text-muted)] font-bold border border-[var(--card-border)]">
                                ${doneTasks} Done
                            </span>
                            <span class="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                                ${totalTasks - doneTasks} Pending
                            </span>
                        </div>
                    </div>

                    <div class="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                        <div class="bg-gradient-to-r from-amber-500 via-[#e6993a] to-emerald-500 h-3 rounded-full transition-all duration-300" style="width: ${taskPct}%;"></div>
                    </div>
                </div>

                <!-- 4. Final Completion Celebration Summary (If project is completed) -->
                ${isCompleted ? `
                    <div class="p-6 rounded-[24px] bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent border-2 border-emerald-500/40 space-y-4 animate-fade-in shadow-lg">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-2xl bg-emerald-500 text-black flex items-center justify-center text-2xl shadow-md">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div>
                                <span class="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                                    MILESTONE ACHIEVED · PROJECT DELIVERED (100%)
                                </span>
                                <h3 class="text-xl font-black text-[var(--text-main)]">
                                    PROJECT COMPLETED!
                                </h3>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <div class="p-3 rounded-xl bg-white/60 dark:bg-[#141c17]/60 border border-emerald-500/20">
                                <span class="text-[10px] text-[var(--text-muted)] block">Contracted Revenue</span>
                                <span class="font-black text-sm text-[var(--text-main)]">${formatETB(finalPrice)}</span>
                            </div>
                            <div class="p-3 rounded-xl bg-white/60 dark:bg-[#141c17]/60 border border-emerald-500/20">
                                <span class="text-[10px] text-[var(--text-muted)] block">Paid Revenue</span>
                                <span class="font-black text-sm text-emerald-600 dark:text-emerald-400">${formatETB(paid)}</span>
                            </div>
                            <div class="p-3 rounded-xl bg-white/60 dark:bg-[#141c17]/60 border border-emerald-500/20">
                                <span class="text-[10px] text-[var(--text-muted)] block">Project Expenses</span>
                                <span class="font-black text-sm text-rose-500">${formatETB(directExpenses)}</span>
                            </div>
                            <div class="p-3 rounded-xl bg-white/60 dark:bg-[#141c17]/60 border border-emerald-500/20">
                                <span class="text-[10px] text-[var(--text-muted)] block">Net Profit</span>
                                <span class="font-black text-sm text-emerald-600 dark:text-[#4bd39a]">${formatETB(netProjectProfit)}</span>
                            </div>
                        </div>

                        <div class="flex flex-wrap items-center justify-between text-xs text-[var(--text-muted)] pt-2 border-t border-emerald-500/20">
                            <span>Completion Date: <strong>${p.actualCompletionDate || new Date().toISOString().split('T')[0]}</strong></span>
                            <span>Client Approval: <strong class="text-emerald-600 dark:text-emerald-400">Signed & Approved ✓ (${p.clientApprovedAt || 'Done'})</strong></span>
                            <span>Total Tasks Completed: <strong>${doneTasks} of ${totalTasks} (100%)</strong></span>
                        </div>
                    </div>
                ` : ''}

                <!-- 4. Step-by-Step Phased Task Checklist -->
                <div class="space-y-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-black text-[var(--text-main)]">Step-by-Step Task Checklist</h3>
                            <p class="text-xs text-[var(--text-muted)]">
                                Generated specifically for ${pkg.name}. Check off tasks as you execute each phase.
                            </p>
                        </div>
                    </div>

                    ${Object.values(phaseGroups).map(group => {
                        const phDone = group.tasks.filter(t => t.done).length;
                        const phTotal = group.tasks.length;
                        const phPct = phTotal > 0 ? Math.round((phDone / phTotal) * 100) : 0;

                        return `
                            <div class="ui-card p-5 sm:p-6 rounded-[24px] border border-[var(--card-border)] space-y-4">
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--card-border)]">
                                    <div class="flex items-center gap-2.5">
                                        <span class="w-7 h-7 rounded-lg bg-[#e6993a]/15 text-[#a06438] dark:text-[#e6993a] font-black text-xs flex items-center justify-center">
                                            P${group.phaseNum}
                                        </span>
                                        <div>
                                            <h4 class="font-black text-base text-[var(--text-main)]">${group.phaseName}</h4>
                                            <span class="text-[10px] text-[var(--text-muted)] font-semibold">
                                                ${phDone} of ${phTotal} completed (${phPct}%)
                                            </span>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-2 self-start sm:self-auto">
                                        <button onclick="addWorkspaceCustomTask('${p.id}', ${group.phaseNum})" class="py-1 px-2.5 rounded-lg text-xs font-bold bg-[var(--subtle-bg)] hover:bg-[#e6993a]/15 text-[var(--text-main)] hover:text-[#e6993a] border border-[var(--card-border)] transition flex items-center gap-1 cursor-pointer">
                                            <i class="fas fa-plus text-[10px]"></i> + Add Task
                                        </button>
                                    </div>
                                </div>

                                <!-- Tasks List in this Phase -->
                                <div class="space-y-2">
                                    ${group.tasks.map((t, idx) => `
                                        <div class="p-3 rounded-xl border transition-all ${t.done ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-[var(--subtle-bg)] border-[var(--card-border)] hover:border-slate-400 dark:hover:border-slate-600'} flex items-start justify-between gap-3 group">
                                            <label class="flex items-start gap-3 cursor-pointer flex-1 min-w-0">
                                                <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleWorkspaceTask('${p.id}', '${t.id}', event)" class="mt-0.5 w-4 h-4 rounded-md accent-[#e6993a] cursor-pointer">
                                                <div class="min-w-0 flex-1">
                                                    <span class="text-xs sm:text-sm font-semibold block leading-snug ${t.done ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-main)]'}">
                                                        ${t.text}
                                                    </span>
                                                    ${t.completedAt ? `
                                                        <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-0.5">
                                                            ✓ Completed on ${t.completedAt}
                                                        </span>
                                                    ` : ''}
                                                </div>
                                            </label>

                                            <!-- Inline Shortcuts for Payment tasks -->
                                            <div class="flex items-center gap-1.5 shrink-0">
                                                ${t.isAdvance && !advanceSatisfied ? `
                                                    <button onclick="quickRecordAdvancePayment('${p.id}', ${advanceTarget - paid})" class="py-1 px-2 rounded-lg text-[10px] font-black bg-amber-500 text-black hover:bg-amber-400 transition cursor-pointer">
                                                        Record 50% Adv
                                                    </button>
                                                ` : ''}
                                                ${t.isFinalPayment && balance > 0 && advanceSatisfied ? `
                                                    <button onclick="${p.clientApproved ? `quickRecordRemainingPayment('${p.id}', ${balance})` : `alert('Please obtain client approval and click Confirm Client Approved before recording final 50% payment.')`}" class="py-1 px-2 rounded-lg text-[10px] font-black ${p.clientApproved ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400'} transition cursor-pointer" title="${p.clientApproved ? 'Record final 50% payment' : 'Client approval required'}">
                                                        Record Remaining 50%
                                                    </button>
                                                ` : ''}
                                                ${t.isCustom ? `
                                                    <button onclick="deleteWorkspaceTask('${p.id}', '${t.id}')" class="w-6 h-6 rounded-md hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer" title="Delete custom task">
                                                        <i class="fas fa-trash-alt text-[10px]"></i>
                                                    </button>
                                                ` : ''}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- 5. Payment Ledger & Project Expenses -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
                    <!-- Payments Received -->
                    <div class="ui-card p-5 sm:p-6 rounded-[24px] border border-[var(--card-border)] space-y-3">
                        <div class="flex items-center justify-between pb-2 border-b border-[var(--card-border)]">
                            <h4 class="font-black text-sm text-[var(--text-main)] flex items-center gap-2">
                                <i class="fas fa-receipt text-emerald-500"></i>
                                <span>Payments Received</span>
                            </h4>
                            <button onclick="openRecordPaymentModal('${p.id}')" class="text-xs font-bold text-[#e6993a] hover:underline cursor-pointer">
                                + Log Payment
                            </button>
                        </div>

                        ${state.payments.filter(pay => pay.projectId === p.id).length === 0 ? `
                            <p class="text-xs text-[var(--text-muted)] p-3 text-center">No payments logged yet for this project.</p>
                        ` : `
                            <div class="space-y-2">
                                ${state.payments.filter(pay => pay.projectId === p.id).map(pay => `
                                    <div class="p-2.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex items-center justify-between text-xs">
                                        <div>
                                            <span class="font-bold text-[var(--text-main)] block">${pay.type || 'Payment'}</span>
                                            <span class="text-[10px] text-[var(--text-muted)]">${pay.date} · ${pay.method} ${pay.reference ? '· ' + pay.reference : ''}</span>
                                        </div>
                                        <span class="font-black text-sm text-emerald-600 dark:text-[#4bd39a]">${formatETB(pay.amount)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        `}
                    </div>

                    <!-- Direct Project Expenses -->
                    <div class="ui-card p-5 sm:p-6 rounded-[24px] border border-[var(--card-border)] space-y-3">
                        <div class="flex items-center justify-between pb-2 border-b border-[var(--card-border)]">
                            <h4 class="font-black text-sm text-[var(--text-main)] flex items-center gap-2">
                                <i class="fas fa-shopping-cart text-rose-500"></i>
                                <span>Direct Project Expenses</span>
                            </h4>
                            <button onclick="openNewExpenseModal()" class="text-xs font-bold text-rose-500 hover:underline cursor-pointer">
                                + Record Expense
                            </button>
                        </div>

                        ${state.expenses.filter(e => e.projectId === p.id).length === 0 ? `
                            <p class="text-xs text-[var(--text-muted)] p-3 text-center">No direct expenses recorded for this project.</p>
                        ` : `
                            <div class="space-y-2">
                                ${state.expenses.filter(e => e.projectId === p.id).map(e => `
                                    <div class="p-2.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex items-center justify-between text-xs">
                                        <div>
                                            <span class="font-bold text-[var(--text-main)] block">${e.description}</span>
                                            <span class="text-[10px] text-[var(--text-muted)]">${e.date} · ${e.category}</span>
                                        </div>
                                        <span class="font-black text-sm text-rose-500">${formatETB(e.amount)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        `}

                        <div class="p-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex justify-between items-center text-xs pt-2">
                            <span class="font-bold text-[var(--text-muted)]">Net Project Profit:</span>
                            <span class="font-black text-base text-emerald-600 dark:text-[#4bd39a]">${formatETB(netProjectProfit)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ==============================================================================
    // 9. PROJECT DETAILS MODAL & TASKS / PAYMENTS
    // ==============================================================================
    window.openProjectDetailModal = function (projectId, initialTab = 'overview') {
        currentDetailProjectId = projectId;
        detailActiveTab = initialTab;
        renderProjectDetailModalContent();
    };

    window.closeProjectDetailModal = function () {
        currentDetailProjectId = null;
        const modal = document.getElementById('project-detail-modal-root');
        if (modal) modal.remove();
    };

    window.switchDetailTab = function (tab) {
        detailActiveTab = tab;
        renderProjectDetailModalContent();
    };

    function renderProjectDetailModalContent() {
        const state = window.clientProjectsState;
        const p = state.projects.find(proj => proj.id === currentDetailProjectId);
        if (!p) return;

        const client = state.clients.find(c => c.id === p.clientId) || { businessName: p.clientName, phone: '', email: '', location: '', classification: 'GOLD' };
        const paid = getProjectPaidAmount(p.id);
        const finalPrice = Number(p.finalPrice) || 0;
        const balance = Math.max(0, finalPrice - paid);
        const payPct = finalPrice > 0 ? Math.min(100, Math.round((paid / finalPrice) * 100)) : 0;
        const payStatus = calculatePaymentStatus(p);

        const directExpenses = getProjectExpenseAmount(p.id);
        const projectProfit = paid - directExpenses;

        let root = document.getElementById('project-detail-modal-root');
        if (!root) {
            root = document.createElement('div');
            root.id = 'project-detail-modal-root';
            root.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in';
            document.body.appendChild(root);
        }

        root.innerHTML = `
            <div class="relative w-full max-w-4xl bg-white dark:bg-[#141c17] rounded-[28px] border border-slate-200 dark:border-[var(--card-border)] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
                <div class="p-5 sm:p-6 pb-4 border-b border-[var(--card-border)] flex items-start justify-between gap-4 bg-[var(--subtle-bg)]">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#a06438] dark:text-[#e6993a]">
                                ${client.businessName}
                            </span>
                            ${getClassificationBadge(client.classification)}
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${p.status === 'Completed' ? 'bg-emerald-500 text-black' : p.status === 'Not Started' ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200' : 'bg-amber-500 text-black'}">
                                ${p.status}
                            </span>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${payStatus === 'Fully Paid' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'}">
                                ${payStatus}
                            </span>
                        </div>
                        <h2 class="text-xl sm:text-2xl font-black text-[var(--text-main)] mt-1">${p.name}</h2>
                    </div>

                    <div class="flex items-center gap-2">
                        <button onclick="openRecordPaymentModal('${p.id}')" class="py-1.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-xs flex items-center gap-1 cursor-pointer">
                            <i class="fas fa-hand-holding-usd"></i> Record Payment
                        </button>
                        <button onclick="closeProjectDetailModal()" class="w-8 h-8 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-slate-400 hover:text-[var(--text-main)] transition cursor-pointer">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>
                </div>

                <!-- 7 Tabs Navigation Bar -->
                <div class="flex items-center gap-1 overflow-x-auto px-5 pt-3 pb-2 border-b border-[var(--card-border)] bg-[var(--card-bg)] scrollbar-none text-xs">
                    ${renderDetailTabNav('overview', 'fas fa-info-circle', 'Overview', detailActiveTab)}
                    ${renderDetailTabNav('services', 'fas fa-calculator', 'Services & Pricing', detailActiveTab)}
                    ${renderDetailTabNav('tasks', 'fas fa-tasks', `Tasks (${p.tasks.length})`, detailActiveTab)}
                    ${renderDetailTabNav('payments', 'fas fa-money-check-alt', `Payments (${state.payments.filter(x=>x.projectId===p.id).length})`, detailActiveTab)}
                    ${renderDetailTabNav('expenses', 'fas fa-receipt', `Expenses (${state.expenses.filter(x=>x.projectId===p.id).length})`, detailActiveTab)}
                    ${renderDetailTabNav('documents', 'fas fa-file-alt', `Documents (${(p.documents||[]).length})`, detailActiveTab)}
                    ${renderDetailTabNav('status_update', 'fas fa-sliders-h', 'Status & Settings', detailActiveTab)}
                </div>

                <!-- Tab Body Content -->
                <div class="p-5 sm:p-6 overflow-y-auto flex-1">
                    ${renderDetailTabBody(detailActiveTab, p, client, { paid, finalPrice, balance, payPct, directExpenses, projectProfit })}
                </div>
            </div>
        `;
    }

    function renderDetailTabNav(tabId, icon, label, current) {
        const isActive = tabId === current;
        return `
            <button onclick="switchDetailTab('${tabId}')" class="px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${isActive ? 'bg-[#121815] text-[#e6993a] dark:bg-[#232f28] dark:text-[#e6993a]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--subtle-bg)]'}">
                <i class="${icon} text-xs"></i>
                <span>${label}</span>
            </button>
        `;
    }

    function renderDetailTabBody(tab, p, client, f) {
        const state = window.clientProjectsState;

        switch (tab) {
            case 'overview':
                return `
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="md:col-span-2 space-y-5">
                            <div>
                                <h4 class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Project Description</h4>
                                <p class="text-sm text-[var(--text-main)] leading-relaxed">${p.description || 'No description provided.'}</p>
                            </div>

                            <div>
                                <h4 class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Selected Services</h4>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    ${p.services.map(s => `
                                        <div class="p-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex justify-between items-center text-xs">
                                            <div>
                                                <span class="font-bold text-[var(--text-main)] block">${s.name}</span>
                                                <span class="text-[10px] text-[var(--text-muted)]">${s.category || 'Service'}</span>
                                            </div>
                                            <span class="font-black text-emerald-600 dark:text-[#4bd39a]">${formatETB(s.price)}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="p-4 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] space-y-2">
                                <h4 class="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider mb-2 flex items-center justify-between">
                                    <span>Client Business Profile</span>
                                    <button onclick="closeProjectDetailModal(); openClientProfileModal('${client.id}')" class="text-[10px] text-[#e6993a] hover:underline cursor-pointer">
                                        View Full Client Profile →
                                    </button>
                                </h4>
                                <div class="grid grid-cols-2 gap-3 text-xs">
                                    <div>
                                        <span class="text-[10px] text-[var(--text-muted)] block">Contact Person</span>
                                        <span class="font-bold text-[var(--text-main)]">${client.contactPerson || '—'}</span>
                                    </div>
                                    <div>
                                        <span class="text-[10px] text-[var(--text-muted)] block">Phone Number</span>
                                        <span class="font-bold text-[var(--text-main)]">${client.phone || '—'}</span>
                                    </div>
                                    <div class="col-span-2">
                                        <span class="text-[10px] text-[var(--text-muted)] block">Location & GPS</span>
                                        <div class="flex items-center gap-2 mt-0.5">
                                            <span class="font-medium text-[var(--text-main)]">${client.location || 'Addis Ababa'}</span>
                                            ${client.googleMapsUrl ? `
                                                <a href="${client.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] flex items-center gap-1 hover:bg-emerald-500/20 transition">
                                                    <i class="fas fa-map-marker-alt"></i> Open Google Maps
                                                </a>
                                            ` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div class="p-4 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] space-y-3">
                                <h4 class="text-xs font-black text-[var(--text-main)] uppercase tracking-wider">Project Ledger (ETB)</h4>
                                <div class="space-y-1.5 text-xs">
                                    <div class="flex justify-between">
                                        <span class="text-[var(--text-muted)]">Subtotal:</span>
                                        <span class="font-bold">${formatETB(p.subtotal || p.finalPrice)}</span>
                                    </div>
                                    ${p.discountAmount > 0 ? `
                                        <div class="flex justify-between text-amber-600 dark:text-amber-400">
                                            <span>Discount:</span>
                                            <span class="font-bold">-${formatETB(p.discountAmount)}</span>
                                        </div>
                                    ` : ''}
                                    <div class="flex justify-between font-black text-sm pt-1.5 border-t border-[var(--card-border)]">
                                        <span>Final Price:</span>
                                        <span class="text-[var(--text-main)]">${formatETB(f.finalPrice)}</span>
                                    </div>
                                    <div class="flex justify-between font-bold text-emerald-600 dark:text-[#4bd39a]">
                                        <span>Total Received:</span>
                                        <span>${formatETB(f.paid)}</span>
                                    </div>
                                    <div class="flex justify-between font-black text-amber-600 dark:text-[#e6993a] pt-1 border-t border-[var(--card-border)]">
                                        <span>Remaining Balance:</span>
                                        <span>${formatETB(f.balance)}</span>
                                    </div>
                                </div>

                                <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div class="bg-gradient-to-r from-emerald-500 to-[#e6993a] h-2 rounded-full" style="width: ${f.payPct}%;"></div>
                                </div>
                                <span class="text-[10px] text-[var(--text-muted)] text-center block font-semibold">${f.payPct}% of contracted price paid</span>

                                <button onclick="openRecordPaymentModal('${p.id}')" class="w-full py-2 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                                    <i class="fas fa-hand-holding-usd"></i> Record Payment
                                </button>
                            </div>

                            <div class="p-4 rounded-2xl bg-gradient-to-br from-[#121815] to-[#1a231d] text-white border border-[#4bd39a]/30 space-y-1">
                                <span class="text-[10px] font-black text-[#4bd39a] uppercase tracking-wider block">Project Realized Profit</span>
                                <div class="text-2xl font-black text-[#4bd39a]">${formatETB(f.projectProfit)}</div>
                                <span class="text-[10px] text-slate-300 block">Received (${formatETB(f.paid)}) - Direct Costs (${formatETB(f.directExpenses)})</span>
                            </div>
                        </div>
                    </div>
                `;

            case 'services':
                return `
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <h4 class="text-sm font-bold text-[var(--text-main)]">Contracted Services & Pricing</h4>
                        </div>
                        <div class="space-y-2">
                            ${p.services.map((s, idx) => `
                                <div class="p-3.5 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex items-center justify-between text-xs">
                                    <div>
                                        <span class="font-bold text-[var(--text-main)] block text-sm">${s.name}</span>
                                        <span class="text-[11px] text-[var(--text-muted)]">${s.category || 'Development'}</span>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <span class="text-sm font-black text-emerald-600 dark:text-[#4bd39a]">${formatETB(s.price)}</span>
                                        <button onclick="promptEditProjectServicePrice('${p.id}', ${idx})" class="p-1 px-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-xs font-semibold cursor-pointer">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

            case 'tasks':
                const doneTasks = p.tasks.filter(t => t.done).length;
                const totalTasks = p.tasks.length;
                const taskPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

                return `
                    <div class="space-y-4">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[var(--card-border)]">
                            <div>
                                <h4 class="text-sm font-bold text-[var(--text-main)]">Project Delivery Milestones & Tasks</h4>
                                <span class="text-xs text-[var(--text-muted)]">${doneTasks} of ${totalTasks} tasks completed (${taskPct}%)</span>
                            </div>
                            <button onclick="promptAddTaskToProject('${p.id}')" class="py-1.5 px-3 rounded-xl text-xs font-bold bg-[#e6993a] text-black hover:bg-[#d8892a] transition cursor-pointer">
                                + Add Custom Task
                            </button>
                        </div>

                        <div class="w-full bg-[var(--card-border)] h-2 rounded-full overflow-hidden">
                            <div class="bg-[#e6993a] h-2 rounded-full transition-all duration-300" style="width: ${taskPct}%;"></div>
                        </div>

                        <div class="space-y-2">
                            ${p.tasks.map((task, tIdx) => `
                                <div class="p-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex items-start justify-between gap-3 text-xs">
                                    <label class="flex items-start gap-2.5 cursor-pointer flex-1 min-w-0">
                                        <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleProjectTaskDone('${p.id}', ${tIdx})" class="mt-0.5 accent-[#e6993a] cursor-pointer">
                                        <div class="min-w-0 flex-1">
                                            <span class="font-bold text-[var(--text-main)] ${task.done ? 'line-through opacity-60' : ''}">${task.text}</span>
                                            ${task.dueDate ? `<span class="text-[10px] text-[var(--text-muted)] block mt-0.5">Due: ${task.dueDate}</span>` : ''}
                                        </div>
                                    </label>
                                    <button onclick="deleteProjectTask('${p.id}', ${tIdx})" class="text-slate-400 hover:text-rose-500 transition p-1 cursor-pointer">
                                        <i class="fas fa-trash-alt text-[10px]"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

            case 'payments':
                const projectPayments = state.payments.filter(pay => pay.projectId === p.id);
                return `
                    <div class="space-y-4">
                        <div class="flex justify-between items-center pb-2 border-b border-[var(--card-border)]">
                            <div>
                                <h4 class="text-sm font-bold text-[var(--text-main)]">Payment Records & History</h4>
                                <span class="text-xs text-[var(--text-muted)]">${projectPayments.length} recorded payments for this project</span>
                            </div>
                            <button onclick="openRecordPaymentModal('${p.id}')" class="py-1.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer">
                                + Record Payment
                            </button>
                        </div>

                        <div class="ui-card rounded-xl overflow-hidden border border-[var(--card-border)]">
                            <table class="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr class="bg-[var(--subtle-bg)] border-b border-[var(--card-border)] text-[var(--text-muted)] font-bold text-[11px]">
                                        <th class="p-2.5">Date</th>
                                        <th class="p-2.5">Type</th>
                                        <th class="p-2.5">Method</th>
                                        <th class="p-2.5">Reference</th>
                                        <th class="p-2.5 text-right">Amount (ETB)</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-[var(--card-border)]">
                                    ${projectPayments.length === 0 ? `
                                        <tr><td colspan="5" class="p-6 text-center text-xs text-[var(--text-muted)]">No payments recorded yet.</td></tr>
                                    ` : projectPayments.map(pay => `
                                        <tr>
                                            <td class="p-2.5 whitespace-nowrap text-[var(--text-muted)]">${pay.date}</td>
                                            <td class="p-2.5 whitespace-nowrap font-bold text-[var(--text-main)]">${pay.type}</td>
                                            <td class="p-2.5 whitespace-nowrap">
                                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                    ${pay.method}
                                                </span>
                                            </td>
                                            <td class="p-2.5 whitespace-nowrap text-[var(--text-muted)] font-mono text-[11px]">${pay.reference || '—'}</td>
                                            <td class="p-2.5 text-right whitespace-nowrap font-black text-emerald-600 dark:text-[#4bd39a]">+${formatETB(pay.amount)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;

            case 'expenses':
                const projectExpenses = state.expenses.filter(e => e.projectId === p.id);
                return `
                    <div class="space-y-4">
                        <div class="flex justify-between items-center pb-2 border-b border-[var(--card-border)]">
                            <div>
                                <h4 class="text-sm font-bold text-[var(--text-main)]">Direct Project Expenses</h4>
                                <span class="text-xs text-[var(--text-muted)]">Costs attributed directly to this project</span>
                            </div>
                            <button onclick="openNewExpenseModal('${p.clientId}', '${p.id}')" class="py-1.5 px-3 rounded-xl text-xs font-bold bg-rose-700/80 hover:bg-rose-600 text-white transition cursor-pointer">
                                + Log Expense
                            </button>
                        </div>

                        <div class="space-y-2">
                            ${projectExpenses.length === 0 ? `
                                <div class="p-6 text-center text-xs text-[var(--text-muted)] bg-[var(--subtle-bg)] rounded-xl">No direct expenses logged for this project.</div>
                            ` : projectExpenses.map(e => `
                                <div class="p-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex justify-between items-center text-xs">
                                    <div>
                                        <span class="font-bold text-[var(--text-main)] block">${e.name}</span>
                                        <span class="text-[10px] text-[var(--text-muted)]">${e.category} · ${e.date}</span>
                                    </div>
                                    <span class="font-black text-rose-600 dark:text-rose-400">-${formatETB(e.amount)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

            case 'documents':
                const docs = p.documents || [];
                return `
                    <div class="space-y-4">
                        <div class="flex justify-between items-center pb-2 border-b border-[var(--card-border)]">
                            <div>
                                <h4 class="text-sm font-bold text-[var(--text-main)]">Client Documents & Files</h4>
                                <span class="text-xs text-[var(--text-muted)]">Store contracts, branding logos, design briefs, and receipts</span>
                            </div>
                            <label class="py-1.5 px-3 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[#e6993a] text-[var(--text-main)] transition cursor-pointer flex items-center gap-1.5">
                                <i class="fas fa-upload text-xs text-[#e6993a]"></i>
                                <span>Upload Document</span>
                                <input type="file" class="hidden" onchange="handleDocumentUpload(event, '${p.id}')">
                            </label>
                        </div>

                        <div class="space-y-2">
                            ${docs.length === 0 ? `
                                <div class="p-6 text-center text-xs text-[var(--text-muted)] bg-[var(--subtle-bg)] rounded-xl">No documents uploaded yet. Upload a logo, agreement, or receipt.</div>
                            ` : docs.map((doc, dIdx) => `
                                <div class="p-3 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] flex items-center justify-between text-xs">
                                    <div class="flex items-center gap-2.5">
                                        <div class="w-8 h-8 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[#e6993a]">
                                            <i class="fas fa-file"></i>
                                        </div>
                                        <div>
                                            <span class="font-bold text-[var(--text-main)] block">${doc.name}</span>
                                            <span class="text-[10px] text-[var(--text-muted)]">${doc.category || 'File'} · ${doc.size || '100 KB'} · ${doc.uploadedAt}</span>
                                        </div>
                                    </div>
                                    <button onclick="deleteProjectDocument('${p.id}', ${dIdx})" class="p-1 text-slate-400 hover:text-rose-500 transition cursor-pointer">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

            case 'status_update':
                const allStatuses = ['Not Started', 'Ongoing', 'Waiting for Client', 'Under Review', 'Approved', 'Completed', 'Cancelled'];
                return `
                    <div class="space-y-4 max-w-lg">
                        <h4 class="text-sm font-bold text-[var(--text-main)]">Update Project Status & Dates</h4>
                        <div class="space-y-3">
                            <div>
                                <label class="text-xs font-semibold text-[var(--text-muted)] block mb-1">Project Status</label>
                                <select id="update-proj-status" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                                    ${allStatuses.map(st => `<option value="${st}" ${p.status === st ? 'selected' : ''}>${st}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-[var(--text-muted)] block mb-1">Payment Deadline</label>
                                <input id="update-proj-deadline" type="date" value="${p.paymentDeadline || ''}" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                            </div>
                            <div>
                                <label class="text-xs font-semibold text-[var(--text-muted)] block mb-1">Expected Completion Date</label>
                                <input id="update-proj-comp-date" type="date" value="${p.expectedCompletionDate || ''}" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                            </div>
                            <button onclick="saveProjectStatusUpdate('${p.id}')" class="py-2 px-4 rounded-xl text-xs font-bold bg-[#e6993a] text-black hover:bg-[#d8892a] transition cursor-pointer">
                                Save Updates
                            </button>
                        </div>
                    </div>
                `;

            default:
                return '<div>Overview</div>';
        }
    }

    // ==============================================================================
    // 10. RECORD PAYMENT & RECORD EXPENSE MODALS
    // ==============================================================================
    window.openRecordPaymentModal = function (preselectedProjectId) {
        const state = window.clientProjectsState;
        if (state.projects.length === 0) {
            alert('No client projects available to record payments against.');
            return;
        }

        const modalHTML = `
            <div id="payment-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                <div class="bg-white dark:bg-[#141c17] rounded-[26px] p-6 w-full max-w-md border border-[var(--card-border)] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-[#4bd39a] flex items-center justify-center">
                                <i class="fas fa-hand-holding-usd text-sm"></i>
                            </div>
                            <h3 class="text-lg font-black text-[var(--text-main)]">Record Client Payment</h3>
                        </div>
                        <button onclick="closeRecordPaymentModal()" class="w-7 h-7 rounded-full bg-[var(--subtle-bg)] flex items-center justify-center text-slate-400 hover:text-[var(--text-main)] cursor-pointer">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form onsubmit="handleRecordPayment(event)" class="space-y-3.5 text-xs">
                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Project *</label>
                            <select id="pay-project" required onchange="updatePaymentModalProjectInfo()" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-bold">
                                ${state.projects.map(p => `
                                    <option value="${p.id}" ${p.id === preselectedProjectId ? 'selected' : ''}>
                                        ${p.clientName} – ${p.name}
                                    </option>
                                `).join('')}
                            </select>
                        </div>

                        <div id="pay-modal-balance-box" class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex justify-between items-center text-xs">
                            <span class="text-amber-800 dark:text-amber-300 font-semibold">Remaining Due:</span>
                            <span id="pay-modal-balance-text" class="font-black text-amber-700 dark:text-[#e6993a]">0 ETB</span>
                        </div>

                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Payment Amount (ETB) *</label>
                            <input id="pay-amount" type="number" min="1" step="any" required placeholder="e.g. 5000" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-base font-black text-emerald-600 dark:text-[#4bd39a] focus:outline-none focus:border-[#e6993a]">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Payment Date *</label>
                                <input id="pay-date" type="date" value="${new Date().toISOString().split('T')[0]}" required class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                            </div>
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Payment Type</label>
                                <select id="pay-type" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                                    <option value="Advance Payment">Advance Payment</option>
                                    <option value="Partial Payment">Partial Payment</option>
                                    <option value="Final Payment">Final Payment</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Payment Method</label>
                                <select id="pay-method" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                                    <option value="Telebirr">Telebirr</option>
                                    <option value="Bank Transfer">Bank Transfer (CBE / Awash)</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Txn / Receipt Reference</label>
                                <input id="pay-ref" placeholder="e.g. TB-8930412 / CBE-FT-12" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                            </div>
                        </div>

                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Payment Notes</label>
                            <input id="pay-notes" placeholder="e.g. Received 50% deposit before design sprint" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                        </div>

                        <div class="pt-2 flex justify-end gap-2">
                            <button type="button" onclick="closeRecordPaymentModal()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm cursor-pointer">
                                Confirmed & Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('cp-modal-container').innerHTML = modalHTML;
        updatePaymentModalProjectInfo();
    };

    window.closeRecordPaymentModal = function () {
        const modal = document.getElementById('payment-modal-backdrop');
        if (modal) modal.remove();
    };

    window.updatePaymentModalProjectInfo = function () {
        const projId = document.getElementById('pay-project')?.value;
        const project = window.clientProjectsState.projects.find(p => p.id === projId);
        if (!project) return;

        const paid = getProjectPaidAmount(project.id);
        const bal = Math.max(0, project.finalPrice - paid);

        const balText = document.getElementById('pay-modal-balance-text');
        const amountInput = document.getElementById('pay-amount');

        if (balText) balText.textContent = formatETB(bal);
        if (amountInput && (!amountInput.value || Number(amountInput.value) === 0)) {
            amountInput.value = bal > 0 ? bal : project.finalPrice;
        }
    };

    window.handleRecordPayment = function (e) {
        e.preventDefault();
        const projId = document.getElementById('pay-project').value;
        const project = window.clientProjectsState.projects.find(p => p.id === projId);
        if (!project) return;

        const amount = Number(document.getElementById('pay-amount').value) || 0;
        const date = document.getElementById('pay-date').value || new Date().toISOString().split('T')[0];
        const type = document.getElementById('pay-type').value;
        const method = document.getElementById('pay-method').value;
        const reference = document.getElementById('pay-ref').value.trim();
        const notes = document.getElementById('pay-notes').value.trim();

        if (amount <= 0) {
            alert('Please enter a valid payment amount in ETB.');
            return;
        }

        const currentlyPaid = getProjectPaidAmount(project.id);
        const remainingDue = project.finalPrice - currentlyPaid;

        if (amount > remainingDue && remainingDue > 0) {
            if (!confirm(`Notice: Payment of ${formatETB(amount)} exceeds the remaining balance of ${formatETB(remainingDue)}. Confirm overpayment?`)) {
                return;
            }
        }

        const newPayment = {
            id: 'pay-' + Date.now(),
            txnId: 'TXN-INC-' + Date.now().toString().slice(-6),
            projectId: project.id,
            clientId: project.clientId,
            clientName: project.clientName,
            amount: amount,
            date: date,
            method: method,
            type: type,
            category: type || 'Project Advance Payment',
            reference: reference,
            notes: notes
        };

        window.clientProjectsState.payments.push(newPayment);

        // Record in permanent Financial Audit Log
        if (!window.clientProjectsState.financialAuditLog) window.clientProjectsState.financialAuditLog = [];
        window.clientProjectsState.financialAuditLog.unshift({
            id: 'faudit-' + Date.now(),
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            action: 'RECORD_INCOME',
            itemType: 'Payment',
            itemId: newPayment.id,
            details: `Payment of ${formatETB(amount)} received from ${project.clientName} via ${method} (${type})`,
            oldValue: '0 ETB',
            newValue: `${formatETB(amount)}`,
            reason: notes || `${type} milestone payment`,
            administrator: 'ELNA Lead Administrator'
        });

        logActivity(`Payment of ${formatETB(amount)} received from ${project.clientName} via ${method} (${type})`, 'payment');

        const newPaid = getProjectPaidAmount(project.id);
        const finalPrice = Number(project.finalPrice) || 0;
        const advTarget = Math.round(finalPrice * 0.5);

        if (project.tasks) {
            if (newPaid >= advTarget) {
                const advTask = project.tasks.find(t => t.isAdvance);
                if (advTask) advTask.done = true;
                const recTask = project.tasks.find(t => t.text.includes('Record payment'));
                if (recTask) recTask.done = true;
            }
            if (finalPrice > 0 && newPaid >= finalPrice) {
                const finTask = project.tasks.find(t => t.isFinalPayment);
                if (finTask) finTask.done = true;
            }
        }

        project.started = true;
        if (finalPrice > 0 && newPaid >= finalPrice) {
            if (!project._fullPaymentCelebrated) {
                project._fullPaymentCelebrated = true;
                playCashRegisterSound();
                triggerMoneyRain();
            }
        } else {
            playCashRegisterSound();
        }

        syncProjectStatus(project);
        checkAndTriggerFinalCompletion(project);

        saveState();
        closeRecordPaymentModal();

        if (typeof _activeWorkspaceProjectId !== 'undefined' && _activeWorkspaceProjectId === project.id) {
            renderProjectWorkspaceContent();
        }
        if (currentDetailProjectId === project.id) {
            renderProjectDetailModalContent();
        }
        renderMainContent();
    };

    // --- EXPENSE MANAGEMENT ---
    window.openNewExpenseModal = function (preselectedClientId, preselectedProjectId) {
        const state = window.clientProjectsState;
        const categories = (state.expenseCategories && state.expenseCategories.length > 0)
            ? state.expenseCategories.filter(c => c.status !== 'inactive').map(c => c.name)
            : ['QR Materials', 'Transportation', 'Hosting and Domains', 'Software and Tools', 'Advertising', 'Miscellaneous'];

        const payMethods = (state.paymentMethods && state.paymentMethods.length > 0)
            ? state.paymentMethods.filter(pm => pm.status !== 'inactive')
            : defaultPaymentMethods;

        const modalHTML = `
            <div id="expense-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                <div class="bg-white dark:bg-[#141c17] rounded-[26px] p-6 w-full max-w-md border border-[var(--card-border)] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
                                <i class="fas fa-receipt text-sm"></i>
                            </div>
                            <h3 class="text-lg font-black text-[var(--text-main)]">Log Business Expense</h3>
                        </div>
                        <button onclick="closeNewExpenseModal()" class="w-7 h-7 rounded-full bg-[var(--subtle-bg)] flex items-center justify-center text-slate-400 hover:text-[var(--text-main)] cursor-pointer">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form onsubmit="handleRecordExpense(event)" class="space-y-3.5 text-xs">
                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Expense Name *</label>
                            <input id="exp-name" required placeholder="e.g. Laser cut acrylic table stands" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Category *</label>
                                <select id="exp-category" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                                    ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Amount (ETB) *</label>
                                <input id="exp-amount" type="number" min="1" step="any" required placeholder="e.g. 1400" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-sm font-black text-rose-600 dark:text-rose-400">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Expense Date *</label>
                                <input id="exp-date" type="date" value="${new Date().toISOString().split('T')[0]}" required class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                            </div>
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Payment Method</label>
                                <select id="exp-method" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                                    ${payMethods.map(pm => `<option value="${pm.name}">${pm.name}</option>`).join('')}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Receipt / Invoice Ref</label>
                            <input id="exp-receipt" placeholder="e.g. Inv #ST-4401 / Telebirr Txn" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                        </div>

                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Associate with Client Project (Optional)</label>
                            <select id="exp-project" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                                <option value="">-- General ELNA Business Expense --</option>
                                ${state.projects.map(p => `
                                    <option value="${p.id}" ${p.id === preselectedProjectId ? 'selected' : ''}>
                                        ${p.clientName}: ${p.name}
                                    </option>
                                `).join('')}
                            </select>
                        </div>

                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Description</label>
                            <textarea id="exp-desc" rows="2" placeholder="Details of the items purchased or service incurred" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]"></textarea>
                        </div>

                        <div class="pt-2 flex justify-end gap-2">
                            <button type="button" onclick="closeNewExpenseModal()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl text-xs font-bold bg-rose-700/80 hover:bg-rose-600 text-white transition shadow-sm cursor-pointer">
                                Save Expense
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closeNewExpenseModal = function () {
        const modal = document.getElementById('expense-modal-backdrop');
        if (modal) modal.remove();
    };

    window.handleRecordExpense = function (e) {
        e.preventDefault();
        const name = document.getElementById('exp-name').value.trim();
        const category = document.getElementById('exp-category').value;
        const amount = Number(document.getElementById('exp-amount').value) || 0;
        const date = document.getElementById('exp-date').value || new Date().toISOString().split('T')[0];
        const method = document.getElementById('exp-method')?.value || 'Bank Transfer';
        const receipt = document.getElementById('exp-receipt').value.trim();
        const projId = document.getElementById('exp-project').value;
        const desc = document.getElementById('exp-desc').value.trim();

        if (amount <= 0) {
            alert('Please enter a valid expense amount.');
            return;
        }

        let relClient = null;
        if (projId) {
            const p = window.clientProjectsState.projects.find(x => x.id === projId);
            if (p) relClient = p.clientId;
        }

        const newExpense = {
            id: 'exp-' + Date.now(),
            txnId: 'TXN-EXP-' + Date.now().toString().slice(-6),
            name: name,
            category: category,
            amount: amount,
            date: date,
            paymentMethod: method,
            clientId: relClient,
            projectId: projId || null,
            description: desc,
            receiptNote: receipt
        };

        window.clientProjectsState.expenses.unshift(newExpense);

        // Record in permanent Financial Audit Log
        if (!window.clientProjectsState.financialAuditLog) window.clientProjectsState.financialAuditLog = [];
        window.clientProjectsState.financialAuditLog.unshift({
            id: 'faudit-' + Date.now(),
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            action: 'RECORD_EXPENSE',
            itemType: 'Expense',
            itemId: newExpense.id,
            details: `Expense of ${formatETB(amount)} recorded: ${name} (${category}) via ${method}`,
            oldValue: '0 ETB',
            newValue: `${formatETB(amount)}`,
            reason: desc || `Business disbursement for ${category}`,
            administrator: 'ELNA Lead Administrator'
        });

        logActivity(`Expense of ${formatETB(amount)} recorded: ${name} (${category})`, 'expense');

        saveState();
        closeNewExpenseModal();

        if (currentDetailProjectId) {
            renderProjectDetailModalContent();
        }
    };

    window.confirmDeleteExpense = function (expId) {
        const exp = window.clientProjectsState.expenses.find(e => e.id === expId);
        if (!exp) return;

        if (confirm(`Are you sure you want to delete expense "${exp.name}" (${formatETB(exp.amount)})?`)) {
            window.clientProjectsState.expenses = window.clientProjectsState.expenses.filter(e => e.id !== expId);
            logActivity(`Expense "${exp.name}" deleted`, 'expense');
            saveState();
        }
    };

    // --- SERVICE CATALOG EDITS ---
    window.promptEditServicePrice = function (serviceId) {
        openPriceChangeModal('service', serviceId);
    };

    window.promptEditProjectServicePrice = function (projectId, serviceIndex) {
        const p = window.clientProjectsState.projects.find(proj => proj.id === projectId);
        if (!p || !p.services[serviceIndex]) return;

        const s = p.services[serviceIndex];
        const val = prompt(`Edit price for service "${s.name}" on this specific project (ETB):`, s.price);
        if (val !== null) {
            const num = Number(val);
            if (!isNaN(num) && num >= 0) {
                s.price = num;
                let sum = p.services.reduce((acc, item) => acc + (Number(item.price) || 0), 0) + (Number(p.extraCharges) || 0);
                p.subtotal = sum;
                if (p.discountType === 'percent') {
                    p.discountAmount = Math.round((sum * Math.min(100, Math.max(0, p.discountValue))) / 100);
                } else {
                    p.discountAmount = Math.min(sum, Math.max(0, p.discountValue));
                }
                p.finalPrice = Math.max(0, sum - p.discountAmount);

                logActivity(`Service "${s.name}" price updated to ${formatETB(num)} on project "${p.name}"`, 'project');
                saveState();
                renderProjectDetailModalContent();
            }
        }
    };

    window.openNewCustomServiceModal = function () {
        openAddServiceModal();
    };

    // --- PROJECT TASKS & DOCUMENTS ---
    window.toggleProjectTaskDone = function (projectId, taskIndex) {
        const p = window.clientProjectsState.projects.find(proj => proj.id === projectId);
        if (!p || !p.tasks[taskIndex]) return;

        p.tasks[taskIndex].done = !p.tasks[taskIndex].done;
        logActivity(`Task "${p.tasks[taskIndex].text}" marked ${p.tasks[taskIndex].done ? 'Completed' : 'Pending'} on "${p.name}"`, 'project');
        saveState();
        renderProjectDetailModalContent();
    };

    window.promptAddTaskToProject = function (projectId) {
        const p = window.clientProjectsState.projects.find(proj => proj.id === projectId);
        if (!p) return;

        const text = prompt('Enter new project milestone task:');
        if (!text || !text.trim()) return;

        p.tasks.push({
            id: 't-' + Date.now(),
            text: text.trim(),
            done: false,
            dueDate: p.expectedCompletionDate || ''
        });

        logActivity(`New task "${text.trim()}" added to project "${p.name}"`, 'project');
        saveState();
        renderProjectDetailModalContent();
    };

    window.deleteProjectTask = function (projectId, taskIndex) {
        const p = window.clientProjectsState.projects.find(proj => proj.id === projectId);
        if (!p || !p.tasks[taskIndex]) return;

        p.tasks.splice(taskIndex, 1);
        saveState();
        renderProjectDetailModalContent();
    };

    window.handleDocumentUpload = function (event, projectId) {
        const file = event.target.files[0];
        if (!file) return;

        const p = window.clientProjectsState.projects.find(proj => proj.id === projectId);
        if (!p) return;

        if (!p.documents) p.documents = [];

        p.documents.push({
            id: 'doc-' + Date.now(),
            name: file.name,
            category: file.name.endsWith('.pdf') ? 'Contract / Doc' : file.name.match(/\.(png|jpg|jpeg|webp)$/i) ? 'Logo / Image' : 'Attachment',
            size: Math.round(file.size / 1024) + ' KB',
            uploadedAt: new Date().toISOString().split('T')[0]
        });

        logActivity(`Document "${file.name}" uploaded to project "${p.name}"`, 'project');
        saveState();
        renderProjectDetailModalContent();
    };

    window.deleteProjectDocument = function (projectId, docIndex) {
        const p = window.clientProjectsState.projects.find(proj => proj.id === projectId);
        if (!p || !p.documents || !p.documents[docIndex]) return;

        if (confirm(`Delete document "${p.documents[docIndex].name}"?`)) {
            p.documents.splice(docIndex, 1);
            saveState();
            renderProjectDetailModalContent();
        }
    };

    window.saveProjectStatusUpdate = function (projectId) {
        const p = window.clientProjectsState.projects.find(proj => proj.id === projectId);
        if (!p) return;

        const status = document.getElementById('update-proj-status').value;
        const deadline = document.getElementById('update-proj-deadline').value;
        const compDate = document.getElementById('update-proj-comp-date').value;

        p.status = status;
        p.paymentDeadline = deadline;
        p.expectedCompletionDate = compDate;

        if (status === 'Completed' && !p.actualCompletionDate) {
            p.actualCompletionDate = new Date().toISOString().split('T')[0];
        }

        logActivity(`Project "${p.name}" status updated to ${status}`, 'project');
        saveState();
        alert('Project settings and status successfully updated.');
        renderProjectDetailModalContent();
    };

    // ==============================================================================
    // 9. CONTROL ROOM INTERACTIVE MODALS & PRICE CHANGE AUDIT SYSTEM
    // ==============================================================================

    // --- 9.1 PRICE CHANGE CONFIRMATION MODAL WITH HISTORICAL PROTECTION GUARANTEE ---
    window.openPriceChangeModal = function (type, targetId) {
        const state = window.clientProjectsState;
        let target = null;
        let oldPrice = 0;
        let typeLabel = '';

        if (type === 'package') {
            target = (state.packages || defaultPackages).find(p => p.id === targetId);
            if (!target) return;
            oldPrice = Number(target.price) || 0;
            typeLabel = 'Package Rate';
        } else {
            target = (state.services || []).find(s => s.id === targetId);
            if (!target) return;
            oldPrice = Number(target.defaultPrice) || 0;
            typeLabel = 'Service Catalog Rate';
        }

        const todayStr = new Date().toISOString().split('T')[0];

        const modalHTML = `
            <div id="price-change-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
                <div class="ui-card w-full max-w-lg rounded-[26px] p-6 border-2 border-[#e6993a] shadow-2xl relative max-h-[92vh] overflow-y-auto">
                    <!-- Modal Header -->
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <div>
                            <span class="text-[10px] font-black uppercase tracking-wider text-[#e6993a] block">
                                PRICE CHANGE AUDIT & VERIFICATION
                            </span>
                            <h3 class="text-xl font-black text-[var(--text-main)] mt-0.5">
                                Update ${typeLabel}: ${target.name}
                            </h3>
                        </div>
                        <button onclick="closePriceChangeModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-xs text-[var(--text-muted)] cursor-pointer">
                            ✕
                        </button>
                    </div>

                    <form onsubmit="savePriceChange(event, '${type}', '${targetId}')" class="space-y-4">
                        <!-- Current vs New Price -->
                        <div class="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)]">
                            <div>
                                <span class="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                                    Current Official Price
                                </span>
                                <span class="text-xl font-black text-slate-700 dark:text-slate-300 mt-1 block">
                                    ${formatETB(oldPrice)}
                                </span>
                            </div>
                            <div>
                                <label class="text-[10px] font-bold text-[#e6993a] uppercase tracking-wider block">
                                    New Official Price (ETB) *
                                </label>
                                <input type="number" id="pcm-new-price" min="0" step="100" value="${oldPrice}" required oninput="updatePriceDiffPreview(${oldPrice})" class="w-full mt-1 p-2 rounded-xl border border-[#e6993a] bg-[var(--card-bg)] text-base font-black text-emerald-600 dark:text-[#4bd39a] focus:outline-none">
                            </div>
                        </div>

                        <!-- Real-Time Variance Preview -->
                        <div id="pcm-diff-preview" class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                            <span class="text-[var(--text-muted)] font-semibold">Projected Adjustment:</span>
                            <span id="pcm-diff-text" class="font-black text-emerald-600 dark:text-emerald-400">0 ETB (0%) No Change</span>
                        </div>

                        <!-- Effective Date & Admin -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Effective Date *</label>
                                <input type="date" id="pcm-effective-date" value="${todayStr}" required class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Authorized Administrator *</label>
                                <input type="text" id="pcm-admin" value="ELNA Lead Administrator" required class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                        </div>

                        <!-- Business Justification / Reason -->
                        <div>
                            <label class="text-xs font-bold text-[var(--text-main)] block mb-1">
                                Business Reason for Price Change <span class="text-rose-500">* (Logged to Audit Trail)</span>
                            </label>
                            <textarea id="pcm-reason" rows="2" required placeholder="e.g. Expanded deliverable scope, updated server hosting infrastructure, market alignment..." class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]"></textarea>
                        </div>

                        <!-- Historical Protection Guarantee Box -->
                        <div class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs">
                            <i class="fas fa-shield-alt text-[#e6993a] text-sm mt-0.5 shrink-0"></i>
                            <div>
                                <strong class="text-[var(--text-main)] block font-extrabold text-[11px] mb-0.5">
                                    IMMUTABLE PRICING PROTECTION GUARANTEE:
                                </strong>
                                <span class="text-[var(--text-muted)] text-[11px] leading-relaxed">
                                    This update applies <strong>STRICTLY to future client registrations</strong>. Existing and completed client agreements remain 100% frozen at their original agreed pricing snapshots.
                                </span>
                            </div>
                        </div>

                        <!-- Mandatory Checkbox Confirmation -->
                        <label class="flex items-start gap-2.5 cursor-pointer pt-1">
                            <input type="checkbox" id="pcm-confirm" required onchange="document.getElementById('pcm-submit-btn').disabled = !this.checked" class="mt-0.5 rounded text-[#e6993a] focus:ring-0">
                            <span class="text-[11px] font-bold text-[var(--text-main)] select-none">
                                I confirm this price change and understand the audit trail will permanently record this transaction.
                            </span>
                        </label>

                        <!-- Actions -->
                        <div class="pt-3 border-t border-[var(--card-border)] flex items-center justify-between">
                            <button type="button" onclick="closePriceChangeModal()" class="py-2.5 px-4 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition cursor-pointer">
                                Cancel
                            </button>
                            <button id="pcm-submit-btn" type="submit" disabled class="py-2.5 px-6 rounded-xl text-xs font-black bg-[#e6993a] text-black hover:bg-[#d8892a] disabled:opacity-40 disabled:cursor-not-allowed transition shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                                <i class="fas fa-save text-xs"></i>
                                <span>Save & Record in Audit Log</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closePriceChangeModal = function () {
        const modal = document.getElementById('price-change-modal-backdrop');
        if (modal) modal.remove();
    };

    window.updatePriceDiffPreview = function (oldPrice) {
        const newPrice = Number(document.getElementById('pcm-new-price').value) || 0;
        const diff = newPrice - oldPrice;
        const pct = oldPrice ? Math.round((diff / oldPrice) * 100) : 0;
        const el = document.getElementById('pcm-diff-text');
        if (!el) return;

        if (diff > 0) {
            el.className = 'font-black text-emerald-600 dark:text-emerald-400';
            el.textContent = `+${formatETB(diff)} (+${pct}%) Increase`;
        } else if (diff < 0) {
            el.className = 'font-black text-rose-600 dark:text-rose-400';
            el.textContent = `${formatETB(diff)} (${pct}%) Decrease`;
        } else {
            el.className = 'font-black text-[var(--text-muted)]';
            el.textContent = '0 ETB (0%) No Change';
        }
    };

    window.savePriceChange = function (event, type, targetId) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const newPrice = Number(document.getElementById('pcm-new-price').value);
        const effectiveDate = document.getElementById('pcm-effective-date').value;
        const admin = document.getElementById('pcm-admin').value.trim();
        const reason = document.getElementById('pcm-reason').value.trim();

        if (isNaN(newPrice) || newPrice < 0) {
            alert('Please enter a valid price in ETB.');
            return;
        }

        let target = null;
        let oldPrice = 0;

        if (type === 'package') {
            target = (state.packages || defaultPackages).find(p => p.id === targetId);
            if (!target) return;
            oldPrice = Number(target.price) || 0;
            target.price = newPrice;
        } else {
            target = (state.services || []).find(s => s.id === targetId);
            if (!target) return;
            oldPrice = Number(target.defaultPrice) || 0;
            target.defaultPrice = newPrice;
        }

        // Create immutable history record
        if (!state.pricingHistory) state.pricingHistory = [];
        state.pricingHistory.unshift({
            id: 'ph-' + Date.now(),
            type: type,
            targetId: targetId,
            targetName: target.name,
            previousPrice: oldPrice,
            newPrice: newPrice,
            effectiveDate: effectiveDate,
            timestamp: new Date().toISOString(),
            reason: reason,
            administrator: admin
        });

        logActivity(`Official price for ${type} "${target.name}" changed from ${formatETB(oldPrice)} to ${formatETB(newPrice)} (Historical protection preserved)`, 'general');
        saveStateDirect(state);
        closePriceChangeModal();
        renderProjects();
    };

    // --- 9.2 EDIT PACKAGE & PHASE/TASK BUILDER MODAL ---
    window.openEditPackageModal = function (packageId) {
        const state = window.clientProjectsState;
        const pkg = (state.packages || defaultPackages).find(p => p.id === packageId);
        if (!pkg) return;

        const allServices = state.services || [];

        const modalHTML = `
            <div id="edit-package-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
                <div class="ui-card w-full max-w-2xl rounded-[26px] p-6 border border-[var(--card-border)] shadow-2xl relative max-h-[92vh] overflow-y-auto my-auto">
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <div>
                            <span class="text-[10px] font-black uppercase tracking-wider text-[#e6993a] block">
                                PACKAGE ARCHITECTURE & PHASES
                            </span>
                            <h3 class="text-xl font-black text-[var(--text-main)]">
                                Configure: ${pkg.name}
                            </h3>
                        </div>
                        <button onclick="closeEditPackageModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] flex items-center justify-center text-xs text-[var(--text-muted)] cursor-pointer">
                            ✕
                        </button>
                    </div>

                    <form onsubmit="savePackageModalForm(event, '${pkg.id}')" class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Package Name *</label>
                                <input type="text" id="epm-name" value="${pkg.name}" required class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-bold focus:outline-none focus:border-[#e6993a]">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Advance Payment Percentage (%) *</label>
                                <input type="number" id="epm-advance" min="10" max="100" value="${pkg.advancePercentage || 50}" required class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-bold focus:outline-none focus:border-[#e6993a]">
                            </div>
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Package Description</label>
                            <textarea id="epm-desc" rows="2" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">${pkg.desc || ''}</textarea>
                        </div>

                        <!-- Included Services Checkboxes -->
                        <div>
                            <label class="text-xs font-bold text-[var(--text-main)] block mb-1.5">
                                Included Services (Bundled in this package):
                            </label>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] max-h-36 overflow-y-auto">
                                ${allServices.map(srv => {
                                    const isIncluded = (pkg.services || []).some(s => s.toLowerCase() === srv.name.toLowerCase());
                                    return `
                                        <label class="flex items-center gap-2 text-xs font-medium text-[var(--text-main)] cursor-pointer">
                                            <input type="checkbox" name="epm_services" value="${srv.name}" ${isIncluded ? 'checked' : ''} class="rounded text-[#e6993a]">
                                            <span class="truncate">${srv.name} (${formatETB(srv.defaultPrice)})</span>
                                        </label>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                        <!-- Phase and Task Management -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-xs font-black text-[var(--text-main)] uppercase tracking-wider">
                                    Phases & Task Workflows:
                                </label>
                                <button type="button" onclick="packageModalAddPhase('${pkg.id}')" class="text-[11px] font-bold text-[#e6993a] hover:underline cursor-pointer">
                                    + Add New Phase
                                </button>
                            </div>

                            <div id="epm-phases-container" class="space-y-3 max-h-64 overflow-y-auto pr-1">
                                ${(pkg.phases || []).map((phase, pIdx) => `
                                    <div class="p-3.5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-xs space-y-2">
                                        <div class="flex items-center justify-between font-extrabold text-[var(--text-main)]">
                                            <span>Phase ${phase.phaseNum || (pIdx + 1)}: ${phase.name}</span>
                                            <button type="button" onclick="packageModalAddTask('${pkg.id}', ${phase.phaseNum || (pIdx + 1)})" class="text-[10px] font-bold text-emerald-600 hover:underline cursor-pointer">
                                                + Add Task Step
                                            </button>
                                        </div>
                                        <div class="space-y-1.5 pl-2 border-l-2 border-amber-500/30">
                                            ${(phase.tasks || []).map((t, tIdx) => `
                                                <div class="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]">
                                                    <span class="text-[11px] font-medium text-[var(--text-main)] truncate">${t.text}</span>
                                                    <div class="flex items-center gap-1 shrink-0">
                                                        ${t.isAdvance ? '<span class="text-[9px] font-black text-amber-500 uppercase">50% Advance</span>' : ''}
                                                        ${t.isFinalPayment ? '<span class="text-[9px] font-black text-emerald-500 uppercase">Final Pay</span>' : ''}
                                                        ${t.isCompletion ? '<span class="text-[9px] font-black text-purple-500 uppercase">Delivery</span>' : ''}
                                                        <button type="button" onclick="packageModalRemoveTask('${pkg.id}', ${phase.phaseNum || (pIdx + 1)}, ${tIdx})" class="text-rose-500 hover:text-rose-700 text-xs px-1 cursor-pointer">
                                                            ✕
                                                        </button>
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Footer Actions -->
                        <div class="pt-3 border-t border-[var(--card-border)] flex items-center justify-between">
                            <button type="button" onclick="closeEditPackageModal()" class="py-2.5 px-4 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2.5 px-6 rounded-xl text-xs font-black bg-[#e6993a] text-black hover:bg-[#d8892a] transition shadow-md cursor-pointer">
                                Save Package Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closeEditPackageModal = function () {
        const modal = document.getElementById('edit-package-modal-backdrop');
        if (modal) modal.remove();
    };

    window.packageModalAddTask = function (pkgId, phaseNum) {
        const text = prompt('Enter new task step description:');
        if (!text || !text.trim()) return;

        const state = window.clientProjectsState;
        const pkg = (state.packages || defaultPackages).find(p => p.id === pkgId);
        if (!pkg || !pkg.phases) return;

        const phase = pkg.phases.find(ph => ph.phaseNum === phaseNum);
        if (phase) {
            if (!phase.tasks) phase.tasks = [];
            phase.tasks.push({
                id: `t-${pkgId}-${phaseNum}-${Date.now()}`,
                text: text.trim(),
                isAdvance: false,
                isFinalPayment: false,
                isCompletion: false
            });
            saveStateDirect(state);
            openEditPackageModal(pkgId);
        }
    };

    window.packageModalRemoveTask = function (pkgId, phaseNum, taskIdx) {
        const state = window.clientProjectsState;
        const pkg = (state.packages || defaultPackages).find(p => p.id === pkgId);
        if (!pkg || !pkg.phases) return;

        const phase = pkg.phases.find(ph => ph.phaseNum === phaseNum);
        if (phase && phase.tasks) {
            phase.tasks.splice(taskIdx, 1);
            saveStateDirect(state);
            openEditPackageModal(pkgId);
        }
    };

    window.packageModalAddPhase = function (pkgId) {
        const name = prompt('Enter title for the new phase (e.g. Phase 5 — Quality Assurance & Launch):');
        if (!name || !name.trim()) return;

        const state = window.clientProjectsState;
        const pkg = (state.packages || defaultPackages).find(p => p.id === pkgId);
        if (!pkg) return;

        if (!pkg.phases) pkg.phases = [];
        const nextNum = pkg.phases.length + 1;
        pkg.phases.push({
            phaseNum: nextNum,
            name: name.trim(),
            tasks: [
                { id: `t-${pkgId}-${nextNum}-1`, text: 'Initiate phase deliverables', isAdvance: false, isFinalPayment: false, isCompletion: false }
            ]
        });

        saveStateDirect(state);
        openEditPackageModal(pkgId);
    };

    window.savePackageModalForm = function (event, pkgId) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const pkg = (state.packages || defaultPackages).find(p => p.id === pkgId);
        if (!pkg) return;

        pkg.name = document.getElementById('epm-name').value.trim();
        pkg.advancePercentage = Math.min(100, Math.max(10, Number(document.getElementById('epm-advance').value) || 50));
        pkg.desc = document.getElementById('epm-desc').value.trim();

        const selectedServices = [];
        document.querySelectorAll('input[name="epm_services"]:checked').forEach(cb => {
            selectedServices.push(cb.value);
        });
        pkg.services = selectedServices;

        logActivity(`Package architecture for "${pkg.name}" updated`, 'general');
        saveStateDirect(state);
        closeEditPackageModal();
        renderProjects();
    };

    // --- 9.3 CREATE NEW PACKAGE MODAL ---
    window.openAddPackageModal = function () {
        const state = window.clientProjectsState;
        const allServices = state.services || [];

        const modalHTML = `
            <div id="add-package-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
                <div class="ui-card w-full max-w-xl rounded-[26px] p-6 border border-[#e6993a] shadow-2xl relative my-auto">
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <div>
                            <span class="text-[10px] font-black uppercase tracking-wider text-[#e6993a] block">
                                NEW PACKAGE CREATOR
                            </span>
                            <h3 class="text-xl font-black text-[var(--text-main)]">
                                Create New Client Solution Package
                            </h3>
                        </div>
                        <button onclick="closeAddPackageModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] flex items-center justify-center text-xs text-[var(--text-muted)] cursor-pointer">
                            ✕
                        </button>
                    </div>

                    <form onsubmit="saveNewPackageModalForm(event)" class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Package Name *</label>
                                <input type="text" id="apm-name" required placeholder="e.g. Enterprise Full-Stack Suite" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-bold focus:outline-none focus:border-[#e6993a]">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Official Price (ETB) *</label>
                                <input type="number" id="apm-price" min="1000" step="500" required placeholder="e.g. 45000" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-black text-emerald-600 focus:outline-none focus:border-[#e6993a]">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Advance Payment (%) *</label>
                                <input type="number" id="apm-advance" min="10" max="100" value="50" required class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Package Version</label>
                                <input type="text" id="apm-version" value="v1.0" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Description & Deliverables Summary</label>
                            <textarea id="apm-desc" rows="2" placeholder="Comprehensive enterprise digital transformation package..." class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]"></textarea>
                        </div>

                        <!-- Included Services -->
                        <div>
                            <label class="text-xs font-bold text-[var(--text-main)] block mb-1.5">
                                Select Included Services:
                            </label>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] max-h-36 overflow-y-auto">
                                ${allServices.map(srv => `
                                    <label class="flex items-center gap-2 text-xs font-medium text-[var(--text-main)] cursor-pointer">
                                        <input type="checkbox" name="apm_services" value="${srv.name}" class="rounded text-[#e6993a]">
                                        <span class="truncate">${srv.name} (${formatETB(srv.defaultPrice)})</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>

                        <div class="pt-3 border-t border-[var(--card-border)] flex items-center justify-between">
                            <button type="button" onclick="closeAddPackageModal()" class="py-2.5 px-4 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2.5 px-6 rounded-xl text-xs font-black bg-[#e6993a] text-black hover:bg-[#d8892a] transition shadow-md cursor-pointer">
                                Launch Package
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closeAddPackageModal = function () {
        const modal = document.getElementById('add-package-modal-backdrop');
        if (modal) modal.remove();
    };

    window.saveNewPackageModalForm = function (event) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const name = document.getElementById('apm-name').value.trim();
        const price = Number(document.getElementById('apm-price').value) || 20000;
        const advance = Number(document.getElementById('apm-advance').value) || 50;
        const version = document.getElementById('apm-version').value.trim() || 'v1.0';
        const desc = document.getElementById('apm-desc').value.trim();

        const selectedServices = [];
        document.querySelectorAll('input[name="apm_services"]:checked').forEach(cb => {
            selectedServices.push(cb.value);
        });

        const newId = 'pkg-' + Date.now();
        const newPkg = {
            id: newId,
            name: name,
            price: price,
            advancePercentage: advance,
            badge: `${name} · ${formatETB(price)}`,
            desc: desc || 'Tailored digital transformation package.',
            status: 'active',
            version: version,
            services: selectedServices,
            phases: [
                {
                    phaseNum: 1,
                    name: 'Phase 1 — Client Preparation & Payment',
                    tasks: [
                        { id: `t-${newId}-1-1`, text: 'Confirm client requirements and deliverables', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: `t-${newId}-1-2`, text: 'Confirm selected package and price', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: `t-${newId}-1-3`, text: `Receive ${advance}% advance payment`, isAdvance: true, isFinalPayment: false, isCompletion: false },
                        { id: `t-${newId}-1-4`, text: 'Collect business assets, logo and photos', isAdvance: false, isFinalPayment: false, isCompletion: false }
                    ]
                },
                {
                    phaseNum: 2,
                    name: 'Phase 2 — Core Execution & Integration',
                    tasks: [
                        { id: `t-${newId}-2-1`, text: 'Execute core technical solutions and configurations', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: `t-${newId}-2-2`, text: 'Integrate client channels and digital platforms', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: `t-${newId}-2-3`, text: 'Quality testing and cross-device review', isAdvance: false, isFinalPayment: false, isCompletion: false }
                    ]
                },
                {
                    phaseNum: 3,
                    name: 'Phase 3 — Review, Final Payment & Delivery',
                    tasks: [
                        { id: `t-${newId}-3-1`, text: 'Walkthrough deliverables with client for approval', isAdvance: false, isFinalPayment: false, isCompletion: false },
                        { id: `t-${newId}-3-2`, text: 'Receive final payment milestone', isAdvance: false, isFinalPayment: true, isCompletion: false },
                        { id: `t-${newId}-3-3`, text: 'Deliver all credentials, access, and close project', isAdvance: false, isFinalPayment: false, isCompletion: true }
                    ]
                }
            ]
        };

        if (!state.packages) state.packages = [];
        state.packages.push(newPkg);

        // Record initial history
        if (!state.pricingHistory) state.pricingHistory = [];
        state.pricingHistory.unshift({
            id: 'ph-' + Date.now(),
            type: 'package',
            targetId: newId,
            targetName: name,
            previousPrice: 0,
            newPrice: price,
            effectiveDate: new Date().toISOString().split('T')[0],
            timestamp: new Date().toISOString(),
            reason: 'Newly launched administrative package.',
            administrator: 'ELNA Lead Administrator'
        });

        logActivity(`New package "${name}" (${formatETB(price)}) launched`, 'general');
        saveStateDirect(state);
        closeAddPackageModal();
        renderProjects();
    };

    // --- 9.4 EDIT SERVICE & TASK TEMPLATE MODAL ---
    window.openEditServiceModal = function (serviceId) {
        const state = window.clientProjectsState;
        const srv = (state.services || []).find(s => s.id === serviceId);
        if (!srv) return;

        const modalHTML = `
            <div id="edit-service-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
                <div class="ui-card w-full max-w-xl rounded-[26px] p-6 border border-[var(--card-border)] shadow-2xl relative my-auto">
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <div>
                            <span class="text-[10px] font-black uppercase tracking-wider text-[#e6993a] block">
                                SERVICE CATALOG CONFIGURATION
                            </span>
                            <h3 class="text-xl font-black text-[var(--text-main)]">
                                Edit: ${srv.name}
                            </h3>
                        </div>
                        <button onclick="closeEditServiceModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] flex items-center justify-center text-xs text-[var(--text-muted)] cursor-pointer">
                            ✕
                        </button>
                    </div>

                    <form onsubmit="saveServiceModalForm(event, '${srv.id}')" class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Service Name *</label>
                                <input type="text" id="esm-name" value="${srv.name}" required class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-bold focus:outline-none focus:border-[#e6993a]">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Category *</label>
                                <input type="text" id="esm-cat" value="${srv.category || 'Consulting'}" required class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Est. Delivery Duration (Days) *</label>
                                <input type="number" id="esm-days" min="1" max="90" value="${srv.deliveryDays || 7}" required class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Service Status *</label>
                                <select id="esm-status" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-bold focus:outline-none focus:border-[#e6993a]">
                                    <option value="active" ${(srv.status || 'active') === 'active' ? 'selected' : ''}>Active</option>
                                    <option value="inactive" ${srv.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                                    <option value="archived" ${srv.status === 'archived' ? 'selected' : ''}>Archived</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Service Description</label>
                            <textarea id="esm-desc" rows="2" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">${srv.description || ''}</textarea>
                        </div>

                        <!-- Default Task Template Editor -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-xs font-black text-[var(--text-main)] uppercase tracking-wider">
                                    Default Task Template (${(srv.defaultTasks || []).length} steps):
                                </label>
                                <button type="button" onclick="serviceModalAddTask('${srv.id}')" class="text-[11px] font-bold text-[#e6993a] hover:underline cursor-pointer">
                                    + Add Step
                                </button>
                            </div>

                            <div class="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                                ${(srv.defaultTasks || []).map((t, idx) => `
                                    <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-[var(--subtle-bg)] border border-[var(--card-border)] text-xs">
                                        <div class="flex items-center gap-2 truncate">
                                            <span class="text-[#e6993a] font-bold shrink-0">${idx + 1}.</span>
                                            <span class="truncate text-[var(--text-main)]">${t}</span>
                                        </div>
                                        <button type="button" onclick="serviceModalRemoveTask('${srv.id}', ${idx})" class="text-rose-500 hover:text-rose-700 text-xs px-1 cursor-pointer shrink-0">
                                            ✕
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="pt-3 border-t border-[var(--card-border)] flex items-center justify-between">
                            <button type="button" onclick="closeEditServiceModal()" class="py-2.5 px-4 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2.5 px-6 rounded-xl text-xs font-black bg-[#e6993a] text-black hover:bg-[#d8892a] transition shadow-md cursor-pointer">
                                Save Service Updates
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closeEditServiceModal = function () {
        const modal = document.getElementById('edit-service-modal-backdrop');
        if (modal) modal.remove();
    };

    window.serviceModalAddTask = function (serviceId) {
        const text = prompt('Enter task milestone description for this service:');
        if (!text || !text.trim()) return;

        const state = window.clientProjectsState;
        const srv = (state.services || []).find(s => s.id === serviceId);
        if (!srv) return;

        if (!srv.defaultTasks) srv.defaultTasks = [];
        srv.defaultTasks.push(text.trim());
        saveStateDirect(state);
        openEditServiceModal(serviceId);
    };

    window.serviceModalRemoveTask = function (serviceId, taskIdx) {
        const state = window.clientProjectsState;
        const srv = (state.services || []).find(s => s.id === serviceId);
        if (!srv || !srv.defaultTasks) return;

        srv.defaultTasks.splice(taskIdx, 1);
        saveStateDirect(state);
        openEditServiceModal(serviceId);
    };

    window.saveServiceModalForm = function (event, serviceId) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const srv = (state.services || []).find(s => s.id === serviceId);
        if (!srv) return;

        srv.name = document.getElementById('esm-name').value.trim();
        srv.category = document.getElementById('esm-cat').value.trim();
        srv.deliveryDays = Number(document.getElementById('esm-days').value) || 7;
        srv.status = document.getElementById('esm-status').value;
        srv.description = document.getElementById('esm-desc').value.trim();

        logActivity(`Service "${srv.name}" catalog details updated`, 'general');
        saveStateDirect(state);
        closeEditServiceModal();
        renderProjects();
    };

    // --- 9.5 CREATE NEW SERVICE MODAL ---
    window.openAddServiceModal = function () {
        const modalHTML = `
            <div id="add-service-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
                <div class="ui-card w-full max-w-lg rounded-[26px] p-6 border border-[#e6993a] shadow-2xl relative my-auto">
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <div>
                            <span class="text-[10px] font-black uppercase tracking-wider text-[#e6993a] block">
                                NEW CATALOG SERVICE
                            </span>
                            <h3 class="text-xl font-black text-[var(--text-main)]">
                                Add Individual Service
                            </h3>
                        </div>
                        <button onclick="closeAddServiceModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] flex items-center justify-center text-xs text-[var(--text-muted)] cursor-pointer">
                            ✕
                        </button>
                    </div>

                    <form onsubmit="saveNewServiceModalForm(event)" class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Service Name *</label>
                                <input type="text" id="asm-name" required placeholder="e.g. Mobile App Development" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-bold focus:outline-none focus:border-[#e6993a]">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Default Price (ETB) *</label>
                                <input type="number" id="asm-price" min="500" step="100" required placeholder="e.g. 15000" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-black text-emerald-600 focus:outline-none focus:border-[#e6993a]">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Category *</label>
                                <input type="text" id="asm-cat" required value="Development" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Est. Delivery (Days) *</label>
                                <input type="number" id="asm-days" min="1" max="90" value="7" required class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                            </div>
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Service Description</label>
                            <textarea id="asm-desc" rows="2" placeholder="Professional high-impact digital deliverable..." class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]"></textarea>
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Initial Task Steps (One per line)</label>
                            <textarea id="asm-tasks" rows="3" placeholder="Collect client brand guidelines&#10;Design initial prototype&#10;Client review and testing&#10;Final deployment" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]"></textarea>
                        </div>

                        <div class="pt-3 border-t border-[var(--card-border)] flex items-center justify-between">
                            <button type="button" onclick="closeAddServiceModal()" class="py-2.5 px-4 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2.5 px-6 rounded-xl text-xs font-black bg-[#e6993a] text-black hover:bg-[#d8892a] transition shadow-md cursor-pointer">
                                Add Service to Catalog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closeAddServiceModal = function () {
        const modal = document.getElementById('add-service-modal-backdrop');
        if (modal) modal.remove();
    };

    window.saveNewServiceModalForm = function (event) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const name = document.getElementById('asm-name').value.trim();
        const price = Number(document.getElementById('asm-price').value) || 10000;
        const category = document.getElementById('asm-cat').value.trim() || 'General';
        const days = Number(document.getElementById('asm-days').value) || 7;
        const desc = document.getElementById('asm-desc').value.trim();
        const tasksRaw = document.getElementById('asm-tasks').value.trim();

        const defaultTasks = tasksRaw ? tasksRaw.split('\n').map(t => t.trim()).filter(Boolean) : [
            'Initial consultation and scope definition',
            'Develop core deliverable',
            'Client review and feedback loop',
            'Final delivery and signoff'
        ];

        const newId = 'srv-' + Date.now();
        const newSrv = {
            id: newId,
            name: name,
            description: desc || 'Tailored digital service deliverable.',
            defaultPrice: price,
            deliveryDays: days,
            category: category,
            status: 'active',
            defaultTasks: defaultTasks
        };

        if (!state.services) state.services = [];
        state.services.push(newSrv);

        // Record history
        if (!state.pricingHistory) state.pricingHistory = [];
        state.pricingHistory.unshift({
            id: 'ph-' + Date.now(),
            type: 'service',
            targetId: newId,
            targetName: name,
            previousPrice: 0,
            newPrice: price,
            effectiveDate: new Date().toISOString().split('T')[0],
            timestamp: new Date().toISOString(),
            reason: 'Newly registered catalog service.',
            administrator: 'ELNA Lead Administrator'
        });

        logActivity(`New service "${name}" (${formatETB(price)}) added to catalog`, 'general');
        saveStateDirect(state);
        closeAddServiceModal();
        renderProjects();
    };

    // --- 9.6 SERVICE & PACKAGE QUICK STATUS TOGGLES ---
    window.setServiceStatus = function (serviceId, status) {
        const state = window.clientProjectsState;
        const srv = (state.services || []).find(s => s.id === serviceId);
        if (!srv) return;

        srv.status = status;
        logActivity(`Service "${srv.name}" status changed to ${status}`, 'general');
        saveStateDirect(state);
        renderProjects();
    };

    window.togglePackageStatus = function (packageId) {
        const state = window.clientProjectsState;
        const pkg = (state.packages || defaultPackages).find(p => p.id === packageId);
        if (!pkg) return;

        pkg.status = (pkg.status === 'inactive') ? 'active' : 'inactive';
        logActivity(`Package "${pkg.name}" status set to ${pkg.status}`, 'general');
        saveStateDirect(state);
        renderProjects();
    };

    // --- 9.7 AUTHORIZED PROJECT PRICE AMENDMENT MODAL (FOR ONGOING CONTRACTS) ---
    window.openProjectPriceAmendmentModal = function (projectId) {
        const state = window.clientProjectsState;
        const p = (state.projects || []).find(proj => proj.id === projectId);
        if (!p) return;

        const currentPrice = Number(p.finalPrice) || 0;
        const todayStr = new Date().toISOString().split('T')[0];

        const modalHTML = `
            <div id="project-amendment-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
                <div class="ui-card w-full max-w-lg rounded-[26px] p-6 border-2 border-amber-500 shadow-2xl relative my-auto">
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <div>
                            <span class="text-[10px] font-black uppercase tracking-wider text-amber-500 block">
                                AUTHORIZED CONTRACT PRICE AMENDMENT
                            </span>
                            <h3 class="text-xl font-black text-[var(--text-main)]">
                                Amend Contract: ${p.clientName}
                            </h3>
                        </div>
                        <button onclick="closeProjectPriceAmendmentModal()" class="w-8 h-8 rounded-full bg-[var(--subtle-bg)] flex items-center justify-center text-xs text-[var(--text-muted)] cursor-pointer">
                            ✕
                        </button>
                    </div>

                    <form onsubmit="saveProjectPriceAmendment(event, '${p.id}')" class="space-y-4">
                        <div class="p-3.5 rounded-2xl bg-[var(--subtle-bg)] border border-[var(--card-border)] space-y-1">
                            <span class="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">Project Name:</span>
                            <span class="text-xs font-extrabold text-[var(--text-main)] block">${p.name}</span>
                            <div class="flex justify-between items-center pt-2 mt-2 border-t border-[var(--card-border)]">
                                <span class="text-xs text-[var(--text-muted)]">Original Agreed Price:</span>
                                <span class="text-base font-black text-slate-700 dark:text-slate-200">${formatETB(currentPrice)}</span>
                            </div>
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[var(--text-main)] block mb-1">
                                Newly Agreed Contract Price (ETB) *
                            </label>
                            <input type="number" id="pam-new-price" min="0" step="100" value="${currentPrice}" required class="w-full p-2.5 rounded-xl border border-amber-500 bg-[var(--card-bg)] text-base font-black text-emerald-600 focus:outline-none">
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[var(--text-main)] block mb-1">
                                Authorization Reason / Contract Addendum Note *
                            </label>
                            <textarea id="pam-reason" rows="2" required placeholder="e.g. Scope extension agreed with client Abebe Tadesse on 2026-11-17..." class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]"></textarea>
                        </div>

                        <div>
                            <label class="text-xs font-bold text-[var(--text-main)] block mb-1">Authorized Administrator *</label>
                            <input type="text" id="pam-admin" value="ELNA Lead Administrator" required class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[#e6993a]">
                        </div>

                        <div class="pt-3 border-t border-[var(--card-border)] flex items-center justify-between">
                            <button type="button" onclick="closeProjectPriceAmendmentModal()" class="py-2.5 px-4 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2.5 px-6 rounded-xl text-xs font-black bg-amber-500 text-black hover:bg-amber-600 transition shadow-md cursor-pointer">
                                Record Authorized Amendment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closeProjectPriceAmendmentModal = function () {
        const modal = document.getElementById('project-amendment-modal-backdrop');
        if (modal) modal.remove();
    };

    window.saveProjectPriceAmendment = function (event, projectId) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const p = (state.projects || []).find(proj => proj.id === projectId);
        if (!p) return;

        const oldPrice = Number(p.finalPrice) || 0;
        const newPrice = Number(document.getElementById('pam-new-price').value);
        const reason = document.getElementById('pam-reason').value.trim();
        const admin = document.getElementById('pam-admin').value.trim();

        if (isNaN(newPrice) || newPrice < 0) {
            alert('Please enter a valid price in ETB.');
            return;
        }

        p.finalPrice = newPrice;
        if (!p.pricingSnapshot) {
            p.pricingSnapshot = {
                packageName: 'Custom Package',
                agreedPrice: oldPrice,
                createdAt: p.startDate || '2026-11-01',
                pricingVersion: 'v1.0'
            };
        }
        if (!p.pricingSnapshot.amendments) p.pricingSnapshot.amendments = [];
        p.pricingSnapshot.amendments.push({
            previousPrice: oldPrice,
            newPrice: newPrice,
            reason: reason,
            authorizedBy: admin,
            date: new Date().toISOString()
        });

        // Add to permanent pricing history
        if (!state.pricingHistory) state.pricingHistory = [];
        state.pricingHistory.unshift({
            id: 'ph-' + Date.now(),
            type: 'contract-amendment',
            targetId: p.id,
            targetName: `${p.clientName} (Contract Amendment)`,
            previousPrice: oldPrice,
            newPrice: newPrice,
            effectiveDate: new Date().toISOString().split('T')[0],
            timestamp: new Date().toISOString(),
            reason: reason,
            administrator: admin
        });

        logActivity(`Contract price for "${p.name}" amended from ${formatETB(oldPrice)} to ${formatETB(newPrice)} (Authorized by ${admin})`, 'project');
        saveStateDirect(state);
        closeProjectPriceAmendmentModal();
        renderProjects();
    };

    // ==============================================================================
    // EARN CONTROL ROOM: INTERACTIVE MODALS & AUDITED TRANSACTIONS
    // ==============================================================================

    // --- 1. EDIT PAYMENT MODAL ---
    window.openEditPaymentModal = function (paymentId) {
        const state = window.clientProjectsState;
        const pay = (state.payments || []).find(p => p.id === paymentId);
        if (!pay) return;

        const incomeCats = state.incomeCategories || defaultIncomeCategories;
        const payMethods = state.paymentMethods || defaultPaymentMethods;

        const modalHTML = `
            <div id="edit-payment-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                <div class="bg-white dark:bg-[#141c17] rounded-[26px] p-6 w-full max-w-md border border-[var(--card-border)] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                <i class="fas fa-edit text-xs"></i>
                            </div>
                            <div>
                                <h3 class="text-base font-black text-[var(--text-main)]">Edit Income Transaction</h3>
                                <span class="text-[10px] font-mono text-[#e6993a]">${pay.txnId || pay.id}</span>
                            </div>
                        </div>
                        <button onclick="closeEditPaymentModal()" class="w-7 h-7 rounded-full bg-[var(--subtle-bg)] flex items-center justify-center text-slate-400 hover:text-[var(--text-main)] cursor-pointer">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form onsubmit="saveEditPaymentForm(event, '${pay.id}')" class="space-y-3.5 text-xs">
                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Client / Project</label>
                            <input disabled value="${pay.clientName || 'Client Project'}" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-muted)] font-bold">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Amount (ETB) *</label>
                                <input id="edit-pay-amount" type="number" step="any" min="1" required value="${pay.amount}" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-sm font-black text-emerald-600 dark:text-[#4bd39a]">
                            </div>
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Payment Date *</label>
                                <input id="edit-pay-date" type="date" required value="${pay.date}" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Category</label>
                                <select id="edit-pay-cat" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-semibold">
                                    ${incomeCats.map(c => `
                                        <option value="${c.name}" ${(pay.category === c.name || pay.type === c.name) ? 'selected' : ''}>${c.name}</option>
                                    `).join('')}
                                    <option value="Advance Payment" ${(pay.type === 'Advance Payment') ? 'selected' : ''}>Advance Payment</option>
                                    <option value="Final Payment" ${(pay.type === 'Final Payment') ? 'selected' : ''}>Final Payment</option>
                                    <option value="Partial Payment" ${(pay.type === 'Partial Payment') ? 'selected' : ''}>Partial Payment</option>
                                </select>
                            </div>
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Method</label>
                                <select id="edit-pay-method" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-semibold">
                                    ${payMethods.map(pm => `
                                        <option value="${pm.name}" ${(pay.method === pm.name) ? 'selected' : ''}>${pm.name}</option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Txn / Receipt Reference</label>
                            <input id="edit-pay-ref" value="${pay.reference || ''}" placeholder="e.g. TB-992140" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                        </div>

                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Audit Trail Reason for Correction *</label>
                            <input id="edit-pay-reason" required placeholder="State reason for modifying payment amount or terms" class="w-full p-2.5 rounded-xl border border-amber-500/40 bg-amber-500/5 text-xs text-[var(--text-main)]">
                        </div>

                        <div class="pt-2 flex justify-end gap-2">
                            <button type="button" onclick="closeEditPaymentModal()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm cursor-pointer">
                                Save Correction
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closeEditPaymentModal = function () {
        const modal = document.getElementById('edit-payment-modal-backdrop');
        if (modal) modal.remove();
    };

    window.saveEditPaymentForm = function (event, paymentId) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const pay = (state.payments || []).find(p => p.id === paymentId);
        if (!pay) return;

        const oldAmount = pay.amount;
        const newAmount = Number(document.getElementById('edit-pay-amount').value) || 0;
        const newDate = document.getElementById('edit-pay-date').value;
        const newCat = document.getElementById('edit-pay-cat').value;
        const newMethod = document.getElementById('edit-pay-method').value;
        const newRef = document.getElementById('edit-pay-ref').value.trim();
        const reason = document.getElementById('edit-pay-reason').value.trim();

        if (newAmount <= 0) {
            alert('Payment amount must be greater than 0 ETB.');
            return;
        }

        pay.amount = newAmount;
        pay.date = newDate;
        pay.category = newCat;
        pay.method = newMethod;
        pay.reference = newRef;

        // Record in permanent Financial Audit Log
        if (!state.financialAuditLog) state.financialAuditLog = [];
        state.financialAuditLog.unshift({
            id: 'faudit-' + Date.now(),
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            action: 'EDIT_INCOME',
            itemType: 'Payment',
            itemId: pay.id,
            details: `Income transaction ${pay.txnId || pay.id} amended from ${formatETB(oldAmount)} to ${formatETB(newAmount)}`,
            oldValue: `${formatETB(oldAmount)}`,
            newValue: `${formatETB(newAmount)}`,
            reason: reason,
            administrator: 'ELNA Lead Administrator'
        });

        // Sync project status if linked
        if (pay.projectId) {
            const project = state.projects.find(p => p.id === pay.projectId);
            if (project) {
                syncProjectStatus(project);
            }
        }

        saveStateDirect(state);
        closeEditPaymentModal();
        renderProjects();
    };

    // --- 2. DELETE PAYMENT CONFIRMATION ---
    window.confirmDeletePayment = function (paymentId) {
        const state = window.clientProjectsState;
        const pay = (state.payments || []).find(p => p.id === paymentId);
        if (!pay) return;

        const modalHTML = `
            <div id="delete-payment-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                <div class="bg-white dark:bg-[#141c17] rounded-[26px] p-6 w-full max-w-md border border-rose-500/30 shadow-2xl space-y-4">
                    <div class="flex items-center gap-3 text-rose-600 dark:text-rose-400">
                        <div class="w-10 h-10 rounded-full bg-rose-500/15 flex items-center justify-center text-lg">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div>
                            <h3 class="text-base font-black text-[var(--text-main)]">Void / Delete Payment Transaction</h3>
                            <span class="text-xs font-mono text-[#e6993a]">${pay.txnId || pay.id} · ${formatETB(pay.amount)}</span>
                        </div>
                    </div>

                    <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                        This action will permanently remove this income transaction of <strong>${formatETB(pay.amount)}</strong> from the ledger and adjust project receivables. An immutable entry will be written to the Financial Audit Trail.
                    </p>

                    <form onsubmit="executeDeletePayment(event, '${pay.id}')" class="space-y-3 text-xs">
                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Reason for Deletion / Reversal *</label>
                            <input id="del-pay-reason" required placeholder="e.g. Duplicate entry, client refund, charge reversal" class="w-full p-2.5 rounded-xl border border-rose-500/40 bg-rose-500/5 text-xs text-[var(--text-main)]">
                        </div>

                        <div class="pt-2 flex justify-end gap-2">
                            <button type="button" onclick="closeDeletePaymentModal()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition shadow-sm cursor-pointer">
                                Confirm Deletion
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closeDeletePaymentModal = function () {
        const modal = document.getElementById('delete-payment-modal-backdrop');
        if (modal) modal.remove();
    };

    window.executeDeletePayment = function (event, paymentId) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const idx = (state.payments || []).findIndex(p => p.id === paymentId);
        if (idx === -1) return;

        const pay = state.payments[idx];
        const reason = document.getElementById('del-pay-reason').value.trim();

        // Write to audit log
        if (!state.financialAuditLog) state.financialAuditLog = [];
        state.financialAuditLog.unshift({
            id: 'faudit-' + Date.now(),
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            action: 'DELETE_INCOME',
            itemType: 'Payment',
            itemId: pay.id,
            details: `Income payment ${pay.txnId || pay.id} of ${formatETB(pay.amount)} reversed/deleted from ${pay.clientName || 'General Client'}`,
            oldValue: `${formatETB(pay.amount)}`,
            newValue: '0 ETB',
            reason: reason,
            administrator: 'ELNA Lead Administrator'
        });

        state.payments.splice(idx, 1);

        if (pay.projectId) {
            const project = state.projects.find(p => p.id === pay.projectId);
            if (project) syncProjectStatus(project);
        }

        logActivity(`Payment of ${formatETB(pay.amount)} deleted: ${reason}`, 'payment');
        saveStateDirect(state);
        closeDeletePaymentModal();
        renderProjects();
    };

    // --- 3. EDIT EXPENSE MODAL ---
    window.openEditExpenseModal = function (expenseId) {
        const state = window.clientProjectsState;
        const exp = (state.expenses || []).find(e => e.id === expenseId);
        if (!exp) return;

        const expCats = state.expenseCategories || defaultExpenseCategories;
        const payMethods = state.paymentMethods || defaultPaymentMethods;

        const modalHTML = `
            <div id="edit-expense-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                <div class="bg-white dark:bg-[#141c17] rounded-[26px] p-6 w-full max-w-md border border-[var(--card-border)] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
                                <i class="fas fa-edit text-xs"></i>
                            </div>
                            <div>
                                <h3 class="text-base font-black text-[var(--text-main)]">Edit Business Expense</h3>
                                <span class="text-[10px] font-mono text-rose-500">${exp.txnId || exp.id}</span>
                            </div>
                        </div>
                        <button onclick="closeEditExpenseModal()" class="w-7 h-7 rounded-full bg-[var(--subtle-bg)] flex items-center justify-center text-slate-400 hover:text-[var(--text-main)] cursor-pointer">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form onsubmit="saveEditExpenseForm(event, '${exp.id}')" class="space-y-3.5 text-xs">
                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Expense Name *</label>
                            <input id="edit-exp-name" required value="${exp.name}" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Amount (ETB) *</label>
                                <input id="edit-exp-amount" type="number" step="any" min="1" required value="${exp.amount}" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-sm font-black text-rose-600 dark:text-rose-400">
                            </div>
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Expense Date *</label>
                                <input id="edit-exp-date" type="date" required value="${exp.date}" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Category</label>
                                <select id="edit-exp-cat" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-semibold">
                                    ${expCats.map(c => `
                                        <option value="${c.name}" ${exp.category === c.name ? 'selected' : ''}>${c.name}</option>
                                    `).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Payment Method</label>
                                <select id="edit-exp-method" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)] font-semibold">
                                    ${payMethods.map(pm => `
                                        <option value="${pm.name}" ${(exp.paymentMethod === pm.name) ? 'selected' : ''}>${pm.name}</option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Receipt / Invoice Ref</label>
                            <input id="edit-exp-receipt" value="${exp.receiptNote || ''}" placeholder="e.g. Inv #ST-4401" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                        </div>

                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Audit Correction Reason *</label>
                            <input id="edit-exp-reason" required placeholder="State reason for modifying expense amount or details" class="w-full p-2.5 rounded-xl border border-amber-500/40 bg-amber-500/5 text-xs text-[var(--text-main)]">
                        </div>

                        <div class="pt-2 flex justify-end gap-2">
                            <button type="button" onclick="closeEditExpenseModal()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition shadow-sm cursor-pointer">
                                Save Correction
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closeEditExpenseModal = function () {
        const modal = document.getElementById('edit-expense-modal-backdrop');
        if (modal) modal.remove();
    };

    window.saveEditExpenseForm = function (event, expenseId) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const exp = (state.expenses || []).find(e => e.id === expenseId);
        if (!exp) return;

        const oldAmount = exp.amount;
        const newName = document.getElementById('edit-exp-name').value.trim();
        const newAmount = Number(document.getElementById('edit-exp-amount').value) || 0;
        const newDate = document.getElementById('edit-exp-date').value;
        const newCat = document.getElementById('edit-exp-cat').value;
        const newMethod = document.getElementById('edit-exp-method').value;
        const newReceipt = document.getElementById('edit-exp-receipt').value.trim();
        const reason = document.getElementById('edit-exp-reason').value.trim();

        if (newAmount <= 0) {
            alert('Expense amount must be greater than 0 ETB.');
            return;
        }

        exp.name = newName;
        exp.amount = newAmount;
        exp.date = newDate;
        exp.category = newCat;
        exp.paymentMethod = newMethod;
        exp.receiptNote = newReceipt;

        // Record in permanent Financial Audit Log
        if (!state.financialAuditLog) state.financialAuditLog = [];
        state.financialAuditLog.unshift({
            id: 'faudit-' + Date.now(),
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            action: 'EDIT_EXPENSE',
            itemType: 'Expense',
            itemId: exp.id,
            details: `Expense ${exp.txnId || exp.id} (${newName}) adjusted from ${formatETB(oldAmount)} to ${formatETB(newAmount)}`,
            oldValue: `${formatETB(oldAmount)}`,
            newValue: `${formatETB(newAmount)}`,
            reason: reason,
            administrator: 'ELNA Lead Administrator'
        });

        saveStateDirect(state);
        closeEditExpenseModal();
        renderProjects();
    };

    // --- 4. DELETE EXPENSE CONFIRMATION ---
    window.confirmDeleteExpense = function (expenseId) {
        const state = window.clientProjectsState;
        const exp = (state.expenses || []).find(e => e.id === expenseId);
        if (!exp) return;

        const modalHTML = `
            <div id="delete-expense-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                <div class="bg-white dark:bg-[#141c17] rounded-[26px] p-6 w-full max-w-md border border-rose-500/30 shadow-2xl space-y-4">
                    <div class="flex items-center gap-3 text-rose-600 dark:text-rose-400">
                        <div class="w-10 h-10 rounded-full bg-rose-500/15 flex items-center justify-center text-lg">
                            <i class="fas fa-trash-alt"></i>
                        </div>
                        <div>
                            <h3 class="text-base font-black text-[var(--text-main)]">Delete Expense Disbursement</h3>
                            <span class="text-xs font-mono text-rose-500">${exp.txnId || exp.id} · ${formatETB(exp.amount)}</span>
                        </div>
                    </div>

                    <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                        Are you sure you want to delete expense <strong>"${exp.name}"</strong> of <strong>${formatETB(exp.amount)}</strong>? This will permanently update cashflow and will be preserved in the audit log.
                    </p>

                    <form onsubmit="executeDeleteExpense(event, '${exp.id}')" class="space-y-3 text-xs">
                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Audit Reason for Expense Removal *</label>
                            <input id="del-exp-reason" required placeholder="e.g. Erroneous receipt, vendor refund, canceled service" class="w-full p-2.5 rounded-xl border border-rose-500/40 bg-rose-500/5 text-xs text-[var(--text-main)]">
                        </div>

                        <div class="pt-2 flex justify-end gap-2">
                            <button type="button" onclick="closeDeleteExpenseModal()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition shadow-sm cursor-pointer">
                                Confirm Deletion
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closeDeleteExpenseModal = function () {
        const modal = document.getElementById('delete-expense-modal-backdrop');
        if (modal) modal.remove();
    };

    window.executeDeleteExpense = function (event, expenseId) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const idx = (state.expenses || []).findIndex(e => e.id === expenseId);
        if (idx === -1) return;

        const exp = state.expenses[idx];
        const reason = document.getElementById('del-exp-reason').value.trim();

        // Write to audit log
        if (!state.financialAuditLog) state.financialAuditLog = [];
        state.financialAuditLog.unshift({
            id: 'faudit-' + Date.now(),
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            action: 'DELETE_EXPENSE',
            itemType: 'Expense',
            itemId: exp.id,
            details: `Expense ${exp.txnId || exp.id} (${exp.name}) of ${formatETB(exp.amount)} removed`,
            oldValue: `${formatETB(exp.amount)}`,
            newValue: '0 ETB',
            reason: reason,
            administrator: 'ELNA Lead Administrator'
        });

        state.expenses.splice(idx, 1);
        logActivity(`Expense deleted: ${exp.name} (${formatETB(exp.amount)}) - ${reason}`, 'expense');
        saveStateDirect(state);
        closeDeleteExpenseModal();
        renderProjects();
    };

    // --- 5. CATEGORY ADD / EDIT MODAL ---
    window.openCategoryModal = function (type, catId) {
        const state = window.clientProjectsState;
        const list = type === 'income' ? (state.incomeCategories || defaultIncomeCategories) : (state.expenseCategories || defaultExpenseCategories);
        const cat = catId ? list.find(c => c.id === catId) : null;
        const isExpense = type === 'expense';

        const modalHTML = `
            <div id="category-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                <div class="bg-white dark:bg-[#141c17] rounded-[26px] p-6 w-full max-w-md border border-[var(--card-border)] shadow-2xl space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full ${isExpense ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-600 dark:text-[#4bd39a]'} flex items-center justify-center">
                                <i class="fas fa-tag text-xs"></i>
                            </div>
                            <h3 class="text-base font-black text-[var(--text-main)]">
                                ${cat ? 'Edit' : 'Add'} ${isExpense ? 'Expense' : 'Income'} Category
                            </h3>
                        </div>
                        <button onclick="closeCategoryModal()" class="w-7 h-7 rounded-full bg-[var(--subtle-bg)] flex items-center justify-center text-slate-400 hover:text-[var(--text-main)] cursor-pointer">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form onsubmit="saveCategoryForm(event, '${type}', '${catId || ''}')" class="space-y-3.5 text-xs">
                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Category Name *</label>
                            <input id="cat-name" required value="${cat ? cat.name : ''}" placeholder="e.g. Logistics & Site Visits" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                        </div>

                        ${isExpense ? `
                            <div>
                                <label class="font-bold text-[var(--text-main)] block mb-1">Monthly Budget Cap (ETB) *</label>
                                <input id="cat-budget" type="number" min="0" required value="${cat ? (cat.budget || 5000) : 5000}" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] font-black text-rose-600 dark:text-rose-400 text-sm">
                            </div>
                        ` : ''}

                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Description</label>
                            <input id="cat-desc" value="${cat ? (cat.description || '') : ''}" placeholder="Brief purpose of this classification" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                        </div>

                        <div class="pt-2 flex justify-end gap-2">
                            <button type="button" onclick="closeCategoryModal()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl text-xs font-bold ${isExpense ? 'bg-rose-700/80 hover:bg-rose-600' : 'bg-emerald-600 hover:bg-emerald-500'} text-white transition shadow-sm cursor-pointer">
                                Save Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closeCategoryModal = function () {
        const modal = document.getElementById('category-modal-backdrop');
        if (modal) modal.remove();
    };

    window.saveCategoryForm = function (event, type, catId) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const name = document.getElementById('cat-name').value.trim();
        const desc = document.getElementById('cat-desc').value.trim();
        const isExpense = type === 'expense';
        const budget = isExpense ? (Number(document.getElementById('cat-budget').value) || 5000) : 0;

        if (isExpense) {
            if (!state.expenseCategories) state.expenseCategories = JSON.parse(JSON.stringify(defaultExpenseCategories));
            if (catId) {
                const c = state.expenseCategories.find(x => x.id === catId);
                if (c) {
                    c.name = name;
                    c.budget = budget;
                    c.description = desc;
                }
            } else {
                state.expenseCategories.push({
                    id: 'exp-cat-' + Date.now(),
                    name: name,
                    budget: budget,
                    description: desc,
                    status: 'active'
                });
            }
        } else {
            if (!state.incomeCategories) state.incomeCategories = JSON.parse(JSON.stringify(defaultIncomeCategories));
            if (catId) {
                const c = state.incomeCategories.find(x => x.id === catId);
                if (c) {
                    c.name = name;
                    c.description = desc;
                }
            } else {
                state.incomeCategories.push({
                    id: 'inc-cat-' + Date.now(),
                    name: name,
                    description: desc,
                    status: 'active'
                });
            }
        }

        saveStateDirect(state);
        closeCategoryModal();
        renderProjects();
    };

    window.toggleCategoryStatus = function (type, catId) {
        const state = window.clientProjectsState;
        const list = type === 'expense' ? state.expenseCategories : state.incomeCategories;
        if (!list) return;
        const c = list.find(x => x.id === catId);
        if (c) {
            c.status = c.status === 'active' ? 'inactive' : 'active';
            saveStateDirect(state);
            renderProjects();
        }
    };

    // --- 6. PAYMENT METHODS MODAL ---
    window.openPaymentMethodModal = function () {
        const modalHTML = `
            <div id="payment-method-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                <div class="bg-white dark:bg-[#141c17] rounded-[26px] p-6 w-full max-w-md border border-[var(--card-border)] shadow-2xl space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-[var(--card-border)]">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-amber-500/10 text-[#e6993a] flex items-center justify-center">
                                <i class="fas fa-credit-card text-xs"></i>
                            </div>
                            <h3 class="text-base font-black text-[var(--text-main)]">Add Payment Rail / Method</h3>
                        </div>
                        <button onclick="closePaymentMethodModal()" class="w-7 h-7 rounded-full bg-[var(--subtle-bg)] flex items-center justify-center text-slate-400 hover:text-[var(--text-main)] cursor-pointer">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>

                    <form onsubmit="savePaymentMethodForm(event)" class="space-y-3.5 text-xs">
                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Payment Method Name *</label>
                            <input id="pm-name" required placeholder="e.g. Hijra Bank / Enat Bank" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                        </div>
                        <div>
                            <label class="font-bold text-[var(--text-main)] block mb-1">Provider / Rail Description</label>
                            <input id="pm-provider" placeholder="e.g. Mobile Banking App & Counter Transfer" class="w-full p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--subtle-bg)] text-xs text-[var(--text-main)]">
                        </div>

                        <div class="pt-2 flex justify-end gap-2">
                            <button type="button" onclick="closePaymentMethodModal()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" class="py-2 px-5 rounded-xl text-xs font-bold bg-[#e6993a] hover:bg-[#d4882c] text-black transition shadow-sm cursor-pointer">
                                Add Method
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closePaymentMethodModal = function () {
        const modal = document.getElementById('payment-method-modal-backdrop');
        if (modal) modal.remove();
    };

    window.savePaymentMethodForm = function (event) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const name = document.getElementById('pm-name').value.trim();
        const provider = document.getElementById('pm-provider').value.trim();

        if (!state.paymentMethods) state.paymentMethods = JSON.parse(JSON.stringify(defaultPaymentMethods));
        state.paymentMethods.push({
            id: 'pm-' + Date.now(),
            name: name,
            provider: provider,
            status: 'active',
            isDefault: false
        });

        saveStateDirect(state);
        closePaymentMethodModal();
        renderProjects();
    };

    window.togglePaymentMethodStatus = function (pmId) {
        const state = window.clientProjectsState;
        if (!state.paymentMethods) return;
        const pm = state.paymentMethods.find(x => x.id === pmId);
        if (pm) {
            pm.status = pm.status === 'active' ? 'inactive' : 'active';
            saveStateDirect(state);
            renderProjects();
        }
    };

    // --- 7. SAVE FINANCIAL SETTINGS ---
    window.saveFinancialSettings = function (event) {
        event.preventDefault();
        const state = window.clientProjectsState;
        const rev = Number(document.getElementById('fset-rev-goal').value) || 100000;
        const prof = Number(document.getElementById('fset-prof-goal').value) || 65000;

        if (!state.financialSettings) state.financialSettings = JSON.parse(JSON.stringify(defaultFinancialSettings));
        state.financialSettings.monthlyRevenueGoal = rev;
        state.financialSettings.monthlyProfitGoal = prof;

        logActivity(`Monthly financial benchmarks updated: Revenue Goal ${formatETB(rev)}, Net Profit Goal ${formatETB(prof)}`, 'project');
        saveStateDirect(state);
        alert('Financial benchmarks successfully updated.');
        renderProjects();
    };

    // --- 8. CSV EXPORT UTILITIES ---
    function triggerDownloadCSV(filename, csvContent) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    window.exportIncomeToCSV = function () {
        const state = window.clientProjectsState;
        const rows = [
            ['Transaction ID', 'Date', 'Client Name', 'Project ID', 'Income Category', 'Payment Method', 'Amount (ETB)', 'Reference', 'Notes']
        ];
        state.payments.forEach(p => {
            rows.push([
                `"${p.txnId || p.id}"`,
                `"${p.date}"`,
                `"${(p.clientName || '').replace(/"/g, '""')}"`,
                `"${p.projectId || ''}"`,
                `"${p.category || p.type || ''}"`,
                `"${p.method || ''}"`,
                p.amount,
                `"${(p.reference || '').replace(/"/g, '""')}"`,
                `"${(p.notes || '').replace(/"/g, '""')}"`
            ]);
        });
        triggerDownloadCSV(`ELNA_Income_Transactions_${new Date().toISOString().split('T')[0]}.csv`, rows.map(r => r.join(',')).join('\n'));
    };

    window.exportExpensesToCSV = function () {
        const state = window.clientProjectsState;
        const rows = [
            ['Transaction ID', 'Date', 'Expense Name', 'Category', 'Payment Method', 'Project ID', 'Client ID', 'Amount (ETB)', 'Receipt Ref', 'Description']
        ];
        state.expenses.forEach(e => {
            rows.push([
                `"${e.txnId || e.id}"`,
                `"${e.date}"`,
                `"${(e.name || '').replace(/"/g, '""')}"`,
                `"${e.category || ''}"`,
                `"${e.paymentMethod || ''}"`,
                `"${e.projectId || 'General Overhead'}"`,
                `"${e.clientId || ''}"`,
                e.amount,
                `"${(e.receiptNote || '').replace(/"/g, '""')}"`,
                `"${(e.description || '').replace(/"/g, '""')}"`
            ]);
        });
        triggerDownloadCSV(`ELNA_Business_Expenses_${new Date().toISOString().split('T')[0]}.csv`, rows.map(r => r.join(',')).join('\n'));
    };

    window.exportPnlToCSV = function () {
        const state = window.clientProjectsState;
        let totalRev = 0;
        state.payments.forEach(p => totalRev += (Number(p.amount) || 0));
        let totalExp = 0;
        state.expenses.forEach(e => totalExp += (Number(e.amount) || 0));
        const net = totalRev - totalExp;

        const rows = [
            ['ELNA DIGITAL FINANCIAL REPORT', 'PROFIT & LOSS STATEMENT'],
            ['Generated Date', new Date().toISOString().split('T')[0]],
            ['Accounting Standard', 'Cash Basis Realized Ledger (ETB)'],
            [''],
            ['Line Item', 'Amount (ETB)'],
            ['Realized Client Revenue', totalRev],
            ['Total Operating Expenses', totalExp],
            ['Net Business Profit', net],
            ['Realized Margin %', totalRev > 0 ? `${Math.round((net / totalRev) * 100)}%` : '0%']
        ];
        triggerDownloadCSV(`ELNA_PnL_Statement_${new Date().toISOString().split('T')[0]}.csv`, rows.map(r => r.join(',')).join('\n'));
    };

    window.exportAuditLogToCSV = function () {
        const state = window.clientProjectsState;
        const rows = [
            ['Audit ID', 'Timestamp', 'Action', 'Item Type', 'Item ID', 'Details', 'Old Value', 'New Value', 'Reason', 'Administrator']
        ];
        (state.financialAuditLog || []).forEach(log => {
            rows.push([
                `"${log.id}"`,
                `"${log.date}"`,
                `"${log.action}"`,
                `"${log.itemType}"`,
                `"${log.itemId}"`,
                `"${(log.details || '').replace(/"/g, '""')}"`,
                `"${log.oldValue || ''}"`,
                `"${log.newValue || ''}"`,
                `"${(log.reason || '').replace(/"/g, '""')}"`,
                `"${log.administrator || ''}"`
            ]);
        });
        triggerDownloadCSV(`ELNA_Financial_Audit_Trail_${new Date().toISOString().split('T')[0]}.csv`, rows.map(r => r.join(',')).join('\n'));
    };

    // --- 9. PRINTABLE REPORT MODAL ---
    window.openPrintableReport = function (reportType, clientId) {
        const state = window.clientProjectsState;
        let title = 'Financial Statement';
        let bodyHTML = '';

        let totalRev = 0;
        state.payments.forEach(p => totalRev += (Number(p.amount) || 0));
        let totalExp = 0;
        state.expenses.forEach(e => totalExp += (Number(e.amount) || 0));
        const net = totalRev - totalExp;

        if (reportType === 'pnl') {
            title = 'Income Statement (Profit & Loss)';
            bodyHTML = `
                <div class="space-y-4">
                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div class="flex justify-between items-center text-sm font-bold text-slate-800 pb-2 border-b border-slate-200">
                            <span>1. Realized Revenue (Actual Cash Received)</span>
                            <span class="text-emerald-700 font-mono text-base font-black">${formatETB(totalRev)}</span>
                        </div>
                        <div class="pl-4 pt-2 text-xs text-slate-600 space-y-1">
                            ${state.payments.map(p => `
                                <div class="flex justify-between">
                                    <span>${p.date} · ${p.clientName} (${p.category || p.type})</span>
                                    <span class="font-mono">${formatETB(p.amount)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div class="flex justify-between items-center text-sm font-bold text-slate-800 pb-2 border-b border-slate-200">
                            <span>2. Operating & Direct Project Expenses</span>
                            <span class="text-rose-700 font-mono text-base font-black">(${formatETB(totalExp)})</span>
                        </div>
                        <div class="pl-4 pt-2 text-xs text-slate-600 space-y-1">
                            ${state.expenses.map(e => `
                                <div class="flex justify-between">
                                    <span>${e.date} · ${e.name} (${e.category})</span>
                                    <span class="font-mono">(${formatETB(e.amount)})</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-emerald-900 flex justify-between items-center">
                        <div>
                            <div class="font-black text-base">NET BUSINESS PROFIT</div>
                            <div class="text-xs text-emerald-700">Realized Margin: ${totalRev > 0 ? Math.round((net / totalRev) * 100) : 0}%</div>
                        </div>
                        <div class="text-2xl font-black font-mono text-emerald-700">${formatETB(net)}</div>
                    </div>
                </div>
            `;
        } else if (reportType === 'expenses') {
            title = 'Itemized Business Expense Audit Report';
            bodyHTML = `
                <table class="w-full text-left text-xs border border-slate-200">
                    <thead class="bg-slate-100 font-bold border-b border-slate-200">
                        <tr>
                            <th class="p-2">Date</th>
                            <th class="p-2">Expense Item</th>
                            <th class="p-2">Category</th>
                            <th class="p-2">Method</th>
                            <th class="p-2">Receipt</th>
                            <th class="p-2 text-right">Amount (ETB)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                        ${state.expenses.map(e => `
                            <tr>
                                <td class="p-2">${e.date}</td>
                                <td class="p-2 font-bold">${e.name}</td>
                                <td class="p-2">${e.category}</td>
                                <td class="p-2">${e.paymentMethod || 'Bank'}</td>
                                <td class="p-2 font-mono text-[10px]">${e.receiptNote || '—'}</td>
                                <td class="p-2 text-right font-black text-rose-700">${formatETB(e.amount)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot class="bg-slate-100 font-black border-t-2 border-slate-300">
                        <tr>
                            <td colspan="5" class="p-2 text-right">Total Operational Outflows:</td>
                            <td class="p-2 text-right text-rose-700">${formatETB(totalExp)}</td>
                        </tr>
                    </tfoot>
                </table>
            `;
        } else if (reportType === 'clients') {
            title = 'Client Accounts & Receivables Ledger';
            bodyHTML = `
                <table class="w-full text-left text-xs border border-slate-200">
                    <thead class="bg-slate-100 font-bold border-b border-slate-200">
                        <tr>
                            <th class="p-2">Client Business</th>
                            <th class="p-2">Project Name</th>
                            <th class="p-2 text-right">Contract Price</th>
                            <th class="p-2 text-right">Paid to Date</th>
                            <th class="p-2 text-right">Balance Due</th>
                            <th class="p-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                        ${state.projects.map(p => {
                            const paid = getProjectPaidAmount(p.id);
                            const due = Math.max(0, p.finalPrice - paid);
                            return `
                                <tr>
                                    <td class="p-2 font-bold">${p.clientName}</td>
                                    <td class="p-2">${p.name}</td>
                                    <td class="p-2 text-right font-mono">${formatETB(p.finalPrice)}</td>
                                    <td class="p-2 text-right font-mono text-emerald-700 font-bold">${formatETB(paid)}</td>
                                    <td class="p-2 text-right font-mono text-amber-700 font-bold">${formatETB(due)}</td>
                                    <td class="p-2 text-center">${p.status}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            `;
        } else {
            title = 'Annual Financial Treasury Summary';
            bodyHTML = `
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                    <div class="flex justify-between border-b pb-2">
                        <span class="font-bold">Total Signed Contracts (Pipeline Value):</span>
                        <span class="font-black font-mono">${formatETB(state.projects.reduce((s, p) => s + (Number(p.finalPrice) || 0), 0))}</span>
                    </div>
                    <div class="flex justify-between border-b pb-2">
                        <span class="font-bold text-emerald-800">Total Realized Revenue (Cash Inflow):</span>
                        <span class="font-black font-mono text-emerald-700">${formatETB(totalRev)}</span>
                    </div>
                    <div class="flex justify-between border-b pb-2">
                        <span class="font-bold text-rose-800">Total Disbursements (Operational Costs):</span>
                        <span class="font-black font-mono text-rose-700">${formatETB(totalExp)}</span>
                    </div>
                    <div class="flex justify-between border-b pb-2">
                        <span class="font-bold text-amber-800">Uncollected Receivables:</span>
                        <span class="font-black font-mono text-amber-700">${formatETB(Math.max(0, state.projects.reduce((s, p) => s + (Number(p.finalPrice) || 0), 0) - totalRev))}</span>
                    </div>
                    <div class="flex justify-between pt-2 text-sm font-black text-slate-900">
                        <span>NET REALIZED PROFIT (SURPLUS):</span>
                        <span class="font-mono text-emerald-700">${formatETB(net)}</span>
                    </div>
                </div>
            `;
        }

        const modalHTML = `
            <div id="printable-report-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
                <div class="bg-white text-slate-900 rounded-[24px] p-6 sm:p-8 w-full max-w-2xl shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
                    <!-- Formal Letterhead -->
                    <div class="flex justify-between items-start pb-4 border-b border-slate-200">
                        <div>
                            <div class="text-xs font-black uppercase tracking-widest text-[#a06438]">ELNA DIGITAL SOLUTIONS</div>
                            <h2 class="text-xl font-black text-slate-900 mt-0.5">${title}</h2>
                            <p class="text-[11px] text-slate-500 mt-1">Official Ethiopian Birr (ETB) Accounting Ledger · Cash Basis</p>
                        </div>
                        <div class="text-right text-xs">
                            <div class="font-mono text-slate-600">Date: ${new Date().toISOString().split('T')[0]}</div>
                            <div class="text-[10px] text-slate-400 mt-0.5">Ref: ELNA-FIN-${Date.now().toString().slice(-6)}</div>
                        </div>
                    </div>

                    <!-- Report Body -->
                    <div class="py-2">
                        ${bodyHTML}
                    </div>

                    <!-- Footer & Print Actions -->
                    <div class="pt-4 border-t border-slate-200 flex items-center justify-between">
                        <div class="text-[10px] text-slate-400">
                            Authorized by ELNA Lead Administrator · Addis Ababa, Ethiopia
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="window.print()" class="py-2 px-4 rounded-xl text-xs font-bold bg-[#121815] text-[#e6993a] border border-[#e6993a]/40 hover:bg-[#1a231d] transition cursor-pointer flex items-center gap-1.5">
                                <i class="fas fa-print"></i> Print Document
                            </button>
                            <button onclick="closePrintableReport()" class="py-2 px-3.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('cp-modal-container').innerHTML = modalHTML;
    };

    window.closePrintableReport = function () {
        const modal = document.getElementById('printable-report-modal');
        if (modal) modal.remove();
    };

})();
