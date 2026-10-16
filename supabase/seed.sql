-- univyX Initial Seed Data
-- Universities, academic records, CIVYN opportunities, marketplace items, and announcements

INSERT INTO public.universities (id, name, short_name, code, country, state, city, website) VALUES
('a0000001-0000-0000-0000-000000000001', 'University of Lagos', 'UNILAG', 'UNILAG', 'Nigeria', 'Lagos', 'Akoka, Yaba', 'https://unilag.edu.ng'),
('a0000001-0000-0000-0000-000000000002', 'University of Ibadan', 'UI', 'UI', 'Nigeria', 'Oyo', 'Ibadan', 'https://ui.edu.ng'),
('a0000001-0000-0000-0000-000000000003', 'Obafemi Awolowo University', 'OAU', 'OAU', 'Nigeria', 'Osun', 'Ile-Ife', 'https://oauife.edu.ng'),
('a0000001-0000-0000-0000-000000000004', 'Covenant University', 'CU', 'CU', 'Nigeria', 'Ogun', 'Ota', 'https://covenantuniversity.edu.ng'),
('a0000001-0000-0000-0000-000000000005', 'Ahmadu Bello University', 'ABU', 'ABU', 'Nigeria', 'Kaduna', 'Zaria', 'https://abu.edu.ng'),
('a0000001-0000-0000-0000-000000000006', 'University of Nigeria, Nsukka', 'UNN', 'UNN', 'Nigeria', 'Enugu', 'Nsukka', 'https://unn.edu.ng')
ON CONFLICT (code) DO NOTHING;

-- Seed university rankings
INSERT INTO public.university_rankings (university_id, power_score, academic_score, gaming_score, sports_score, tournaments_won) VALUES
('a0000001-0000-0000-0000-000000000001', 94.20, 93.50, 95.00, 94.10, 8),
('a0000001-0000-0000-0000-000000000002', 92.80, 96.00, 89.50, 91.00, 6),
('a0000001-0000-0000-0000-000000000003', 91.40, 92.00, 90.00, 92.50, 5),
('a0000001-0000-0000-0000-000000000004', 90.60, 94.50, 88.00, 87.00, 4),
('a0000001-0000-0000-0000-000000000005', 88.90, 89.00, 86.50, 91.50, 3),
('a0000001-0000-0000-0000-000000000006', 87.50, 88.50, 85.00, 89.00, 2)
ON CONFLICT (university_id) DO NOTHING;

-- Seed Knowledge Directory
INSERT INTO public.knowledge_entries (title, summary, content, category, tags, source_attribution) VALUES
('Cumulative Grade Point Average (CGPA) Calculation (5.0 Scale)', 
 'Standard formula for calculating semester GPA and Cumulative GPA in Nigerian Universities.', 
 'The 5.0 grading scale operates with Grade Points: A (70-100%) = 5 pts, B (60-69%) = 4 pts, C (50-59%) = 3 pts, D (45-49%) = 2 pts, E (40-44%) = 1 pt, F (0-39%) = 0 pt. Formula: Total Weighted Grade Points (Units x Grade Point) divided by Total Credit Units Registered.', 
 'grading_system', 
 ARRAY['GPA', 'CGPA', 'Grading Scale', 'Academic Regulations'], 
 'National Universities Commission (NUC) BMAS Standard'),

('SIWES & Industrial Training (IT) Clearance Guide', 
 'Prerequisites and submission workflow for the Student Industrial Work Experience Scheme.', 
 'Students in science, technology, and engineering disciplines must complete 3 to 6 months of supervised industrial training. Required deliverables include: End of Attachment Form (Form 8), Logbook signed weekly by the industry supervisor, and the final typed technical report defended before the departmental panel.', 
 'academic_procedure', 
 ARRAY['SIWES', 'Industrial Training', 'Internship', 'IT Defense'], 
 'Industrial Training Fund (ITF) Directive'),

('Academic Course Add/Drop & Deferment Protocols', 
 'Official timeline and protocol for modifying course registrations or requesting semester deferrals.', 
 'Course registration modifications are permitted within the first 3 weeks of the semester via the university student portal. Requests for semester deferment on medical or personal grounds must be submitted in writing through the Head of Department (HOD) to the Dean of Faculty prior to matriculation or examination registration close.', 
 'academic_procedure', 
 ARRAY['Course Registration', 'Add Drop', 'Deferment', 'HOD'], 
 'University Academic Senate Regulation');

-- Seed Arena Announcements
INSERT INTO public.arena_announcements (title, description, category, event_date, status) VALUES
('univyX Inter-Campus Esports Championship 2026', 'Official university tournament for collegiate e-football and tactical arena teams. Qualifying rounds begin across campus gaming hubs.', 'Tournament', NOW() + INTERVAL '14 days', 'published'),
('Campus Power League: Season 1 Rankings Announced', 'Top 10 universities ranked across verified student challenge performance and inter-faculty debates.', 'Rankings', NOW() - INTERVAL '2 days', 'published');
