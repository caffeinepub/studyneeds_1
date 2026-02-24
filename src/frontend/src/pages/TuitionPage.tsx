import { useState } from 'react';
import { Star, MapPin, Phone, MessageSquare, ChevronDown } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useSubmitStudentLead, useSubmitTeacherRegistration } from '../hooks/useQueries';
import { toast } from 'sonner';
import { ExternalBlob } from '../backend';

const demoTeachers = [
  {
    id: 1,
    name: 'Amit Kumar',
    photo: '/assets/generated/teacher-demo-1.dim_200x200.png',
    qualification: 'M.Sc. Mathematics',
    experience: '5 Years',
    subjects: 'Maths, Physics',
    fees: '₹500/month',
    rating: 4.8,
    location: 'Patna',
  },
  {
    id: 2,
    name: 'Priya Singh',
    photo: '/assets/generated/teacher-demo-2.dim_200x200.png',
    qualification: 'B.Ed, M.A. English',
    experience: '3 Years',
    subjects: 'English, Hindi',
    fees: '₹400/month',
    rating: 4.6,
    location: 'Patna',
  },
  {
    id: 3,
    name: 'Rajesh Sharma',
    photo: '/assets/generated/teacher-demo-3.dim_200x200.png',
    qualification: 'B.Tech Computer Science',
    experience: '7 Years',
    subjects: 'Computer, Coding',
    fees: '₹600/month',
    rating: 4.9,
    location: 'Patna',
  },
  {
    id: 4,
    name: 'Neha Verma',
    photo: '/assets/generated/teacher-demo-4.dim_200x200.png',
    qualification: 'M.Sc. Chemistry',
    experience: '4 Years',
    subjects: 'Chemistry, Biology',
    fees: '₹450/month',
    rating: 4.7,
    location: 'Patna',
  },
  {
    id: 5,
    name: 'Vikram Jha',
    photo: '/assets/generated/teacher-demo-5.dim_200x200.png',
    qualification: 'M.Com, CA Inter',
    experience: '6 Years',
    subjects: 'Commerce, Accounts',
    fees: '₹550/month',
    rating: 4.8,
    location: 'Patna',
  },
];

export default function TuitionPage() {
  const submitStudentLead = useSubmitStudentLead();
  const submitTeacherRegistration = useSubmitTeacherRegistration();

  // Student form state
  const [studentForm, setStudentForm] = useState({
    studentName: '',
    classOrCourse: '',
    subjectsRequired: '',
    mode: 'Home',
    location: '',
    budget: '',
    preferredTime: '',
    contactNumber: '',
    additionalNotes: '',
  });

  // Teacher form state
  const [teacherForm, setTeacherForm] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    qualification: '',
    subjectsTeach: '',
    classesTeach: '',
    experienceYears: '',
    mode: [] as string[],
    location: '',
    expectedFees: '',
    photo: null as File | null,
    idProof: null as File | null,
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentForm.studentName || !studentForm.classOrCourse || !studentForm.subjectsRequired || 
        !studentForm.location || !studentForm.budget || !studentForm.contactNumber) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      await submitStudentLead.mutateAsync({
        id: '',
        studentName: studentForm.studentName,
        classOrCourse: studentForm.classOrCourse,
        subjectsRequired: studentForm.subjectsRequired,
        mode: studentForm.mode,
        location: studentForm.location,
        budget: BigInt(studentForm.budget),
        preferredTime: studentForm.preferredTime,
        contactNumber: studentForm.contactNumber,
        additionalNotes: studentForm.additionalNotes,
        submittedAt: BigInt(0),
        status: '',
      });

      setStudentForm({
        studentName: '',
        classOrCourse: '',
        subjectsRequired: '',
        mode: 'Home',
        location: '',
        budget: '',
        preferredTime: '',
        contactNumber: '',
        additionalNotes: '',
      });
    } catch (error: any) {
      console.error('Student lead submission error:', error);
    }
  };

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teacherForm.fullName || !teacherForm.mobileNumber || !teacherForm.email || 
        !teacherForm.qualification || !teacherForm.subjectsTeach || !teacherForm.classesTeach ||
        !teacherForm.experienceYears || !teacherForm.location || !teacherForm.expectedFees ||
        !teacherForm.photo || !teacherForm.idProof) {
      toast.error('Please fill all required fields including photo and ID proof');
      return;
    }

    try {
      const photoBytes = new Uint8Array(await teacherForm.photo.arrayBuffer());
      const idProofBytes = new Uint8Array(await teacherForm.idProof.arrayBuffer());
      
      const photoBlob = ExternalBlob.fromBytes(photoBytes);
      const idProofBlob = ExternalBlob.fromBytes(idProofBytes);

      await submitTeacherRegistration.mutateAsync({
        id: '',
        fullName: teacherForm.fullName,
        mobileNumber: teacherForm.mobileNumber,
        email: teacherForm.email,
        qualification: teacherForm.qualification,
        subjectsTeach: teacherForm.subjectsTeach,
        classesTeach: teacherForm.classesTeach,
        experienceYears: BigInt(teacherForm.experienceYears),
        mode: teacherForm.mode.join(', '),
        location: teacherForm.location,
        expectedFees: BigInt(teacherForm.expectedFees),
        photoUrl: photoBlob.getDirectURL(),
        idProofUrl: idProofBlob.getDirectURL(),
        submittedAt: BigInt(0),
        status: '',
      });

      setTeacherForm({
        fullName: '',
        mobileNumber: '',
        email: '',
        qualification: '',
        subjectsTeach: '',
        classesTeach: '',
        experienceYears: '',
        mode: [],
        location: '',
        expectedFees: '',
        photo: null,
        idProof: null,
      });
    } catch (error: any) {
      console.error('Teacher registration error:', error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-20 md:py-32"
        style={{ backgroundImage: `linear-gradient(rgba(0, 31, 63, 0.85), rgba(0, 31, 63, 0.85)), url('/assets/generated/tuition-hero-bg.dim_1920x600.png')` }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Find the Best Home & Online Tutors Near You
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Qualified and verified teachers for School, Competitive Exams, and Skill Subjects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
              onClick={() => scrollToSection('student-form')}
            >
              Find a Teacher
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-[oklch(0.22_0.10_260)] hover:bg-gray-100 px-8 py-6 text-lg border-2"
              onClick={() => scrollToSection('teacher-form')}
            >
              Become a Teacher
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-[oklch(0.22_0.10_260)]/10 rounded-full flex items-center justify-center">
                <img src="/assets/generated/step-requirement-icon.dim_80x80.png" alt="Step 1" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Step 1</h3>
              <p className="text-gray-600">Tell us your requirement</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-[oklch(0.22_0.10_260)]/10 rounded-full flex items-center justify-center">
                <img src="/assets/generated/step-match-icon.dim_80x80.png" alt="Step 2" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Step 2</h3>
              <p className="text-gray-600">Get matched with verified teachers</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-[oklch(0.22_0.10_260)]/10 rounded-full flex items-center justify-center">
                <img src="/assets/generated/step-learning-icon.dim_80x80.png" alt="Step 3" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Step 3</h3>
              <p className="text-gray-600">Start learning at your home or online</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Requirement Form */}
      <section id="student-form" className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-[oklch(0.22_0.10_260)]">Book a Tutor Now</h2>
            <form onSubmit={handleStudentSubmit} className="space-y-6">
              <div>
                <Label htmlFor="studentName">Student Name *</Label>
                <Input
                  id="studentName"
                  value={studentForm.studentName}
                  onChange={(e) => setStudentForm({ ...studentForm, studentName: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="classOrCourse">Class / Course *</Label>
                <Select value={studentForm.classOrCourse} onValueChange={(value) => setStudentForm({ ...studentForm, classOrCourse: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select class or course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nursery">Nursery</SelectItem>
                    <SelectItem value="Class 1">Class 1</SelectItem>
                    <SelectItem value="Class 2">Class 2</SelectItem>
                    <SelectItem value="Class 3">Class 3</SelectItem>
                    <SelectItem value="Class 4">Class 4</SelectItem>
                    <SelectItem value="Class 5">Class 5</SelectItem>
                    <SelectItem value="Class 6">Class 6</SelectItem>
                    <SelectItem value="Class 7">Class 7</SelectItem>
                    <SelectItem value="Class 8">Class 8</SelectItem>
                    <SelectItem value="Class 9">Class 9</SelectItem>
                    <SelectItem value="Class 10">Class 10</SelectItem>
                    <SelectItem value="Class 11">Class 11</SelectItem>
                    <SelectItem value="Class 12">Class 12</SelectItem>
                    <SelectItem value="Competitive Exams">Competitive Exams</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subjectsRequired">Subjects Required *</Label>
                <Input
                  id="subjectsRequired"
                  value={studentForm.subjectsRequired}
                  onChange={(e) => setStudentForm({ ...studentForm, subjectsRequired: e.target.value })}
                  placeholder="e.g., Maths, Science, English"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Mode *</Label>
                <RadioGroup value={studentForm.mode} onValueChange={(value) => setStudentForm({ ...studentForm, mode: value })} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Home" id="home" />
                    <Label htmlFor="home" className="font-normal cursor-pointer">Home</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Online" id="online" />
                    <Label htmlFor="online" className="font-normal cursor-pointer">Online</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Both" id="both" />
                    <Label htmlFor="both" className="font-normal cursor-pointer">Both</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="location">Location / Area *</Label>
                <Input
                  id="location"
                  value={studentForm.location}
                  onChange={(e) => setStudentForm({ ...studentForm, location: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="budget">Budget per month (₹) *</Label>
                <Input
                  id="budget"
                  type="number"
                  value={studentForm.budget}
                  onChange={(e) => setStudentForm({ ...studentForm, budget: e.target.value })}
                  placeholder="500"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Input
                  id="preferredTime"
                  value={studentForm.preferredTime}
                  onChange={(e) => setStudentForm({ ...studentForm, preferredTime: e.target.value })}
                  placeholder="e.g., Evening 5-7 PM"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contactNumber">Contact Number *</Label>
                <Input
                  id="contactNumber"
                  type="tel"
                  value={studentForm.contactNumber}
                  onChange={(e) => setStudentForm({ ...studentForm, contactNumber: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={studentForm.additionalNotes}
                  onChange={(e) => setStudentForm({ ...studentForm, additionalNotes: e.target.value })}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[oklch(0.22_0.10_260)] hover:bg-[oklch(0.18_0.08_260)] text-white py-6 text-lg"
                disabled={submitStudentLead.isPending}
              >
                {submitStudentLead.isPending ? 'Submitting...' : 'Find Teachers'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Search Tutors</h2>
          <div className="max-w-5xl mx-auto bg-gray-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="filterSubject">Subject</Label>
                <Select>
                  <SelectTrigger id="filterSubject" className="mt-1">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maths">Maths</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="social">Social Studies</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="computer">Computer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="filterClass">Class</Label>
                <Select>
                  <SelectTrigger id="filterClass" className="mt-1">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">Class 1-5</SelectItem>
                    <SelectItem value="6-8">Class 6-8</SelectItem>
                    <SelectItem value="9-10">Class 9-10</SelectItem>
                    <SelectItem value="11-12">Class 11-12</SelectItem>
                    <SelectItem value="competitive">Competitive Exams</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="filterLocation">Location</Label>
                <Input id="filterLocation" placeholder="Enter location" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="filterBudget">Budget (₹)</Label>
                <Input id="filterBudget" type="number" placeholder="Max budget" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="filterMode">Mode</Label>
                <Select>
                  <SelectTrigger id="filterMode" className="mt-1">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Top Rated Tutors Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoTeachers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={teacher.photo} 
                      alt={teacher.name} 
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[oklch(0.22_0.10_260)]">{teacher.name}</h3>
                      <p className="text-sm text-gray-600">{teacher.qualification}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(teacher.rating)}
                        <span className="text-sm text-gray-600 ml-1">({teacher.rating})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="font-semibold">Experience:</span>
                      <span>{teacher.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="font-semibold">Subjects:</span>
                      <span>{teacher.subjects}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4" />
                      <span>{teacher.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-orange-600">
                      <span>Fees:</span>
                      <span>{teacher.fees}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-[oklch(0.22_0.10_260)] hover:bg-[oklch(0.18_0.08_260)] text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Registration Form */}
      <section id="teacher-form" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-[oklch(0.22_0.10_260)]">Become a StudyNeeds Tutor</h2>
            <form onSubmit={handleTeacherSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={teacherForm.fullName}
                    onChange={(e) => setTeacherForm({ ...teacherForm, fullName: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="mobileNumber">Mobile Number *</Label>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    value={teacherForm.mobileNumber}
                    onChange={(e) => setTeacherForm({ ...teacherForm, mobileNumber: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={teacherForm.email}
                  onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="qualification">Qualification *</Label>
                <Input
                  id="qualification"
                  value={teacherForm.qualification}
                  onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                  placeholder="e.g., B.Ed, M.Sc. Mathematics"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="subjectsTeach">Subjects You Teach *</Label>
                  <Input
                    id="subjectsTeach"
                    value={teacherForm.subjectsTeach}
                    onChange={(e) => setTeacherForm({ ...teacherForm, subjectsTeach: e.target.value })}
                    placeholder="e.g., Maths, Physics"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="classesTeach">Classes You Teach *</Label>
                  <Input
                    id="classesTeach"
                    value={teacherForm.classesTeach}
                    onChange={(e) => setTeacherForm({ ...teacherForm, classesTeach: e.target.value })}
                    placeholder="e.g., Class 6-10"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="experienceYears">Experience (Years) *</Label>
                  <Input
                    id="experienceYears"
                    type="number"
                    value={teacherForm.experienceYears}
                    onChange={(e) => setTeacherForm({ ...teacherForm, experienceYears: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="expectedFees">Expected Fees (₹/month) *</Label>
                  <Input
                    id="expectedFees"
                    type="number"
                    value={teacherForm.expectedFees}
                    onChange={(e) => setTeacherForm({ ...teacherForm, expectedFees: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Mode *</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="modeHome"
                      checked={teacherForm.mode.includes('Home')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setTeacherForm({ ...teacherForm, mode: [...teacherForm.mode, 'Home'] });
                        } else {
                          setTeacherForm({ ...teacherForm, mode: teacherForm.mode.filter(m => m !== 'Home') });
                        }
                      }}
                    />
                    <Label htmlFor="modeHome" className="font-normal cursor-pointer">Home</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="modeOnline"
                      checked={teacherForm.mode.includes('Online')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setTeacherForm({ ...teacherForm, mode: [...teacherForm.mode, 'Online'] });
                        } else {
                          setTeacherForm({ ...teacherForm, mode: teacherForm.mode.filter(m => m !== 'Online') });
                        }
                      }}
                    />
                    <Label htmlFor="modeOnline" className="font-normal cursor-pointer">Online</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="teacherLocation">Location *</Label>
                <Input
                  id="teacherLocation"
                  value={teacherForm.location}
                  onChange={(e) => setTeacherForm({ ...teacherForm, location: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="photo">Upload Photo (JPG, PNG) *</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(e) => setTeacherForm({ ...teacherForm, photo: e.target.files?.[0] || null })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="idProof">Upload ID Proof (JPG, PNG, PDF) *</Label>
                <Input
                  id="idProof"
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => setTeacherForm({ ...teacherForm, idProof: e.target.files?.[0] || null })}
                  required
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[oklch(0.22_0.10_260)] hover:bg-[oklch(0.18_0.08_260)] text-white py-6 text-lg"
                disabled={submitTeacherRegistration.isPending}
              >
                {submitTeacherRegistration.isPending ? 'Submitting...' : 'Register as Teacher'}
              </Button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Join hundreds of tutors earning with StudyNeeds.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Why Choose StudyNeeds Tutors */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose StudyNeeds Tutors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[oklch(0.22_0.10_260)]/10 rounded-full flex items-center justify-center">
                <img src="/assets/generated/benefit-verified-icon.dim_64x64.png" alt="Verified" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Verified Teachers</h3>
              <p className="text-gray-600">All teachers are verified with proper credentials and background checks</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[oklch(0.22_0.10_260)]/10 rounded-full flex items-center justify-center">
                <img src="/assets/generated/benefit-affordable-icon.dim_64x64.png" alt="Affordable" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Affordable Fees</h3>
              <p className="text-gray-600">Competitive pricing with transparent fee structure for all budgets</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[oklch(0.22_0.10_260)]/10 rounded-full flex items-center justify-center">
                <img src="/assets/generated/benefit-personal-icon.dim_64x64.png" alt="Personal" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Personal Attention</h3>
              <p className="text-gray-600">One-on-one focused teaching for better understanding and results</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[oklch(0.22_0.10_260)]/10 rounded-full flex items-center justify-center">
                <img src="/assets/generated/benefit-flexible-icon.dim_64x64.png" alt="Flexible" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Flexible Timings</h3>
              <p className="text-gray-600">Choose class timings that suit your schedule and convenience</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[oklch(0.22_0.10_260)]/10 rounded-full flex items-center justify-center">
                <img src="/assets/generated/benefit-local-icon.dim_64x64.png" alt="Local" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Local Tutors Available</h3>
              <p className="text-gray-600">Find experienced teachers in your locality for home tuitions</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[oklch(0.22_0.10_260)]/10 rounded-full flex items-center justify-center">
                <img src="/assets/generated/benefit-online-home-icon.dim_64x64.png" alt="Online & Home" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[oklch(0.22_0.10_260)]">Online & Home Options</h3>
              <p className="text-gray-600">Choose between home tuition or online classes as per your preference</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects We Cover */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Subjects We Cover</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Maths', 'Science', 'English', 'Commerce', 'Computer', 'Competitive Exams', 'Spoken English', 'Coding', 'All School Classes'].map((subject) => (
              <div 
                key={subject}
                className="px-6 py-3 bg-[oklch(0.22_0.10_260)] text-white rounded-full font-medium hover:bg-[oklch(0.18_0.08_260)] transition-colors cursor-pointer"
              >
                {subject}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {renderStars(5)}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "My child improved marks within 2 months. Highly recommended."
              </p>
              <div className="border-t pt-4">
                <p className="font-bold text-[oklch(0.22_0.10_260)]">Rajesh Kumar</p>
                <p className="text-sm text-gray-600">Parent</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {renderStars(5)}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Teacher was very supportive and explained concepts clearly."
              </p>
              <div className="border-t pt-4">
                <p className="font-bold text-[oklch(0.22_0.10_260)]">Priya Singh</p>
                <p className="text-sm text-gray-600">Student</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {renderStars(5)}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Excellent service! Found the perfect tutor for my daughter's board exam preparation."
              </p>
              <div className="border-t pt-4">
                <p className="font-bold text-[oklch(0.22_0.10_260)]">Sunita Devi</p>
                <p className="text-sm text-gray-600">Parent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:text-[oklch(0.22_0.10_260)]">
                How do I find a tutor?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Simply fill out the student requirement form above with your details, and our team will match you with verified teachers in your area. You'll receive teacher recommendations within 24 hours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:text-[oklch(0.22_0.10_260)]">
                Are teachers verified?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, all teachers on StudyNeeds are thoroughly verified. We check their qualifications, experience, and conduct background verification before onboarding them to our platform.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:text-[oklch(0.22_0.10_260)]">
                Can I change tutor?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Absolutely! If you're not satisfied with your current tutor, you can request a change anytime. We'll provide you with alternative teacher options at no extra cost.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:text-[oklch(0.22_0.10_260)]">
                Do you provide online classes?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, we offer both home tuition and online classes. You can choose your preferred mode when filling the requirement form, or select both options for flexibility.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:text-[oklch(0.22_0.10_260)]">
                What are the fees?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Fees vary based on class, subject, and teacher experience. Typically, fees range from ₹300 to ₹800 per month. You can specify your budget in the requirement form, and we'll match you with suitable teachers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.22_0.10_260)] to-[oklch(0.18_0.08_260)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help Finding a Teacher?</h2>
          <p className="text-lg mb-8 text-gray-200">Our expert team is here to assist you</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[oklch(0.22_0.10_260)] hover:bg-gray-100 px-8 py-6 text-lg"
              onClick={() => scrollToSection('student-form')}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Talk to Our Expert
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[oklch(0.22_0.10_260)] px-8 py-6 text-lg"
              asChild
            >
              <a href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20finding%20a%20tutor" target="_blank" rel="noopener noreferrer">
                <SiWhatsapp className="w-5 h-5 mr-2" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Start Learning Today with StudyNeeds</h2>
          <Button 
            size="lg" 
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold"
            onClick={() => scrollToSection('student-form')}
          >
            Book a Tutor Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
