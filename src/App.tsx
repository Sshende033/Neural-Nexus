import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Trophy, 
  Gamepad2, 
  Search, 
  PenTool, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Upload, 
  CheckCircle2,
  Users,
  Mail,
  Phone,
  School,
  QrCode,
  ArrowRight,
  X,
  ArrowUp,
  ArrowDown,
  Star,
  MessageSquare,
  Share2,
  Edit2,
  XCircle,
  Clock,
  BrainCircuit,
  Sparkles,
  Network,
  Globe,
  Terminal
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COMPETITIONS = [
  {
    id: 'prompt-nova',
    name: 'Prompt - Nova',
    description: 'Write a prompt to AI for an expected output image.',
    date: '24th March',
    icon: PenTool,
    fees: { individual: 50, team: 100 },
    maxTeam: 2,
    color: 'from-purple-500 to-blue-500',
    rules: [
      {
        title: "General Rules",
        items: [
          "Team size: 1-2 members.",
          "The competition consists of 3 rounds.",
          "Topics or problems will be given on the spot during the event.",
          "Focus is on prompt engineering, AI interaction, creativity, and problem solving."
        ]
      },
      {
        title: "Round Structure",
        items: [
          "Round 1: Basic Prompting - Participants will be given a simple image or concept to recreate using prompts.",
          "Round 2: Advanced Prompting - Participants must generate an image based on a complex scenario or abstract theme.",
          "Round 3: Prompt Battle - Finalists will compete head-to-head to generate the most accurate and creative image within a strict time limit."
        ]
      },
      {
        title: "Judging Criteria",
        items: [
          "Accuracy: How closely the generated image matches the given prompt or theme.",
          "Creativity: Originality and unique interpretation of the prompt.",
          "Efficiency: Achieving the desired result with concise and effective prompts."
        ]
      },
      {
        title: "Additional Instructions",
        items: [
          "Participants must use the provided AI tools/platforms.",
          "Any form of plagiarism or use of pre-written prompts is strictly prohibited.",
          "The judge's decision will be final and binding."
        ]
      }
    ]
  },
  {
    id: 'poster-panorama',
    name: 'Poster Panorama',
    description: 'Digital & Handmade Poster presentation.',
    note: 'Digital & Handmade Poster presentation. The poster should be made previously.',
    date: '23rd March',
    icon: Search,
    fees: { individual: 50, team: 100 },
    maxTeam: 2,
    color: 'from-emerald-500 to-teal-500',
    rules: [
      {
        title: "General Participation Rules",
        items: [
          "Participants can compete individually or in teams of maximum 2 members.",
          "Participants must create a poster based on a given theme.",
          "Posters should be creative, informative, and visually appealing."
        ]
      },
      {
        title: "Poster Creation Guidelines",
        items: [
          "Both digital and handmade posters are allowed.",
          "Digital posters must be submitted in high-resolution PDF or JPEG format.",
          "Handmade posters must be brought to the venue on the day of the event.",
          "The poster must clearly convey the theme and include relevant information."
        ]
      },
      {
        title: "Judging Criteria",
        items: [
          "Relevance to the theme.",
          "Creativity and originality of the design.",
          "Clarity of the message and information presented.",
          "Overall visual impact and aesthetic appeal."
        ]
      },
      {
        title: "Submission Instructions",
        items: [
          "Digital posters must be submitted via the provided link before the deadline.",
          "Handmade posters must be registered at the venue at least 30 minutes before the event starts.",
          "Late submissions will not be accepted."
        ]
      }
    ]
  },
  {
    id: 'e-sports',
    name: 'E-Sports',
    description: '"Survive To DOMINATE" - BGMI / FREEFIRE',
    date: '24 March 2026',
    icon: Gamepad2,
    fees: { team: 200 },
    maxTeam: 4,
    color: 'from-orange-500 to-red-500',
    rules: [
      {
        title: "General Tournament Rules",
        items: [
          "Players may participate individually or in teams depending on the game.",
          "The tournament will follow a knockout or league format.",
          "All participants must bring their own devices and ensure they are fully charged.",
          "Stable internet connection will be provided, but participants can use their own mobile data."
        ]
      },
      {
        title: "Gameplay Guidelines",
        items: [
          "Use of emulators, hacks, or any third-party software is strictly prohibited and will result in immediate disqualification.",
          "Teaming up with opponents is not allowed.",
          "Players must report to their respective lobbies 10 minutes before the match starts."
        ]
      },
      {
        title: "Fair Play and Conduct Rules",
        items: [
          "Fair play and sportsmanship are required at all times.",
          "Toxic behavior, abusive language, or harassment will lead to disqualification.",
          "Respect the organizers and other participants."
        ]
      },
      {
        title: "Technical Issue Guidelines",
        items: [
          "In case of a technical issue (e.g., game crash, network drop), the match will continue unless the issue affects the majority of the players.",
          "Players are responsible for their own device's performance."
        ]
      },
      {
        title: "Winner Determination",
        items: [
          "Winners will be determined based on the points system (placement points + kill points).",
          "In case of a tie, the team with the higher number of kills will be ranked higher.",
          "The organizer's decision will be final."
        ]
      }
    ]
  },
  {
    id: 'treasure-hunt',
    name: 'Treasure Hunt',
    description: 'Find the hidden treasure with the given clues.',
    date: '23rd March',
    icon: Trophy,
    fees: { individual: 50, team: 250 },
    maxTeam: 5,
    color: 'from-yellow-500 to-orange-500',
    rules: [
      {
        title: "General Rules",
        items: [
          "Team size: Maximum 5 members.",
          "The event takes place across the college campus.",
          "Teams must stay together at all times during the hunt."
        ]
      },
      {
        title: "Treasure Hunt Gameplay Rules",
        items: [
          "Teams must solve clues and puzzles to find the next location.",
          "Each solved clue will lead to the next clue or a task.",
          "Skipping clues or taking shortcuts is not allowed and will result in penalties."
        ]
      },
      {
        title: "Safety and Conduct Guidelines",
        items: [
          "Do not run in the corridors or restricted areas.",
          "Do not damage college property or disturb ongoing classes.",
          "Follow the instructions of the volunteers and organizers."
        ]
      },
      {
        title: "Winner Selection Criteria",
        items: [
          "The first team to find the final treasure and complete all tasks wins.",
          "In case of a tie, the team that completed the tasks with the fewest hints will be the winner.",
          "The organizer's decision is final."
        ]
      }
    ]
  }
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function App() {
  const [step, setStep] = useState<'landing' | 'register' | 'success' | 'admin_login' | 'admin'>('landing');
  const [selectedComp, setSelectedComp] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [viewingProof, setViewingProof] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dynamic Content State
  const [team, setTeam] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [prizePools, setPrizePools] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<any[]>([]);
  const [activeAdminTab, setActiveAdminTab] = useState<'registrations' | 'content' | 'feedback'>('registrations');
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [contentType, setContentType] = useState<'team' | 'sponsor' | 'contact' | 'prize_pool' | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isEditingRegistration, setIsEditingRegistration] = useState(false);
  const [editingRegistration, setEditingRegistration] = useState<any | null>(null);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // AI Features State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string, timestamp?: string}[]>([
    { role: 'ai', text: 'Hi! I am Nexus, your AI assistant for Neural Nexus 2k26. How can I help you today?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [currentChatMessage, setCurrentChatMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isGeneratingTeamName, setIsGeneratingTeamName] = useState(false);
  const [generatedTeamNames, setGeneratedTeamNames] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const formRef = useRef<HTMLFormElement>(null);
  const contentFormRef = useRef<HTMLFormElement>(null);
  const registrationEditFormRef = useRef<HTMLFormElement>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({ isOpen: true, title, message, onConfirm });
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRegistrations = React.useMemo(() => {
    let items = [...registrations];
    
    if (statusFilter !== 'all') {
      items = items.filter(reg => (reg.payment_status || 'pending') === statusFilter);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      items = items.filter(reg => 
        (reg.lead_name && reg.lead_name.toLowerCase().includes(query)) ||
        (reg.email && reg.email.toLowerCase().includes(query)) ||
        (reg.team_name && reg.team_name.toLowerCase().includes(query)) ||
        (reg.phone && reg.phone.toLowerCase().includes(query)) ||
        (reg.transaction_id && reg.transaction_id.toLowerCase().includes(query)) ||
        (reg.teammates_names && reg.teammates_names.toLowerCase().includes(query)) ||
        (reg.institution && reg.institution.toLowerCase().includes(query))
      );
    }

    if (sortConfig !== null) {
      items.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'payment_screenshot') {
          aValue = aValue ? 1 : 0;
          bValue = bValue ? 1 : 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return items;
  }, [registrations, sortConfig, statusFilter, searchQuery]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const allowedEmails = ['shendesahil033@gmail.com', 'viewer@gmail.com'];
    if (allowedEmails.includes(loginEmail.toLowerCase().trim())) {
      setStep('admin');
      setLoginError('');
    } else {
      setLoginError('Unauthorized email address.');
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/admin/registrations');
      if (!response.ok) return;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setRegistrations(data);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      if (!response.ok) return;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setTeam(data.team || []);
        setSponsors(data.sponsors || []);
        setPrizePools(data.prize_pools || []);
        setContacts(data.contacts || []);
        setSettings(data.settings || {});
        setFeedback(data.feedback || []);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const fetchAdminFeedback = async () => {
    try {
      const response = await fetch('/api/admin/feedback');
      if (!response.ok) return;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setFeedback(data);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (step === 'admin') {
      fetchRegistrations();
      fetchContent();
      fetchAdminFeedback();
    }
  }, [step]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentChatMessage.trim()) return;

    const userMessage = currentChatMessage.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setCurrentChatMessage('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      if (response.ok) {
        const data = await response.json();
        setChatMessages(prev => [...prev, { role: 'ai', text: data.response, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I am having trouble connecting right now.', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Sorry, an error occurred.', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGenerateTeamName = async () => {
    if (!selectedComp) return;
    
    setIsGeneratingTeamName(true);
    setGeneratedTeamNames([]);
    
    try {
      const response = await fetch('/api/generate-team-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ competition: selectedComp })
      });
      
      if (response.ok) {
        const data = await response.json();
        setGeneratedTeamNames(data.names || []);
      } else {
        showNotification('Failed to generate team names', 'error');
      }
    } catch (error) {
      console.error('Generate team name error:', error);
      showNotification('An error occurred while generating names', 'error');
    } finally {
      setIsGeneratingTeamName(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    const formData = new FormData(formRef.current);
    
    if (selectedComp) {
      formData.append('competition', selectedComp);
    }

    if (file) {
      formData.append('paymentScreenshot', file);
    } else {
      showNotification('Please upload a payment screenshot', 'error');
      setIsSubmitting(false);
      return;
    }

    const currentComp = COMPETITIONS.find(c => c.id === selectedComp);
    let teammatesCount = parseInt(formData.get('teammatesCount') as string) || 1;

    if (selectedComp === 'e-sports') {
      const leadIgn = formData.get('lead_ign');
      const leadUid = formData.get('lead_uid');
      const leadName = formData.get('leadName');
      formData.set('leadName', `${leadName} (IGN: ${leadIgn}, UID: ${leadUid})`);

      const p2 = `${formData.get('p2_name')} (IGN: ${formData.get('p2_ign')}, UID: ${formData.get('p2_uid')})`;
      const p3 = `${formData.get('p3_name')} (IGN: ${formData.get('p3_ign')}, UID: ${formData.get('p3_uid')})`;
      const p4 = `${formData.get('p4_name')} (IGN: ${formData.get('p4_ign')}, UID: ${formData.get('p4_uid')})`;
      
      formData.set('teammatesNames', `${p2}\n${p3}\n${p4}`);
      teammatesCount = 4;
      formData.set('teammatesCount', teammatesCount.toString());
    }

    const amount = currentComp?.fees.individual 
      ? (teammatesCount === 1 ? currentComp.fees.individual : currentComp.fees.team)
      : currentComp?.fees.team;

    formData.append('amount', amount?.toString() || '0');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });
      
      const contentType = response.headers.get("content-type");
      if (response.ok && contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.success) {
          setRegistrationStatus(data.status || 'pending');
          setStep('success');
        } else {
          showNotification(data.error || 'Registration failed. Please try again.', 'error');
          setIsSubmitting(false);
        }
      } else {
        const data = await response.json().catch(() => ({}));
        showNotification(data.error || 'Registration failed. Please try again.', 'error');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('An error occurred. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentFormRef.current) return;

    setIsSubmitting(true);
    
    try {
      let response;
      if (contentType === 'contact' || contentType === 'prize_pool') {
        const formData = new FormData(contentFormRef.current);
        const data = Object.fromEntries(formData);
        const endpoint = editingItem 
          ? `/api/admin/${contentType === 'contact' ? 'contacts' : 'prize_pools'}/${editingItem.id}` 
          : `/api/admin/${contentType === 'contact' ? 'contacts' : 'prize_pools'}`;
        const method = editingItem ? 'PUT' : 'POST';
        
        response = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } else {
        const formData = new FormData(contentFormRef.current);
        const endpoint = editingItem 
          ? `/api/admin/${contentType === 'team' ? 'team' : 'sponsors'}/${editingItem.id}` 
          : (contentType === 'team' ? '/api/admin/team' : '/api/admin/sponsors');
        const method = editingItem ? 'PUT' : 'POST';
        
        response = await fetch(endpoint, {
          method,
          body: formData,
        });
      }
      
      if (response.ok) {
        const contentTypeHeader = response.headers.get("content-type");
        if (contentTypeHeader && contentTypeHeader.includes("application/json")) {
          await response.json(); // Consume the response
        }
        setIsAddingContent(false);
        setContentType(null);
        setEditingItem(null);
        fetchContent();
        showNotification(`Content ${editingItem ? 'updated' : 'added'} successfully`);
      } else {
        showNotification(`Failed to ${editingItem ? 'update' : 'add'} content`, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('An error occurred', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteContent = async (type: 'team' | 'sponsors' | 'contacts' | 'prize_pools', id: number) => {
    showConfirm(
      'Delete Content',
      'Are you sure you want to delete this item? This action cannot be undone.',
      async () => {
        try {
          const response = await fetch(`/api/admin/${type}/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            fetchContent();
            showNotification('Item deleted successfully');
          }
        } catch (error) {
          console.error('Error deleting content:', error);
          showNotification('Failed to delete item', 'error');
        }
      }
    );
  };

  const handleDeleteFeedback = async (id: number) => {
    showConfirm(
      'Delete Feedback',
      'Are you sure you want to delete this feedback?',
      async () => {
        try {
          const response = await fetch(`/api/admin/feedback/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            fetchAdminFeedback();
            showNotification('Feedback deleted successfully');
          }
        } catch (error) {
          console.error('Error deleting feedback:', error);
          showNotification('Failed to delete feedback', 'error');
        }
      }
    );
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/registrations/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchRegistrations();
        showNotification(`Status updated to ${status}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showNotification('Failed to update status', 'error');
    }
  };

  const handleDeleteRegistration = async (id: number) => {
    showConfirm(
      'Delete Registration',
      'Are you sure you want to delete this registration? All details will be permanently removed.',
      async () => {
        try {
          const response = await fetch(`/api/admin/registrations/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            fetchRegistrations();
            showNotification('Registration deleted successfully');
          }
        } catch (error) {
          console.error('Error deleting registration:', error);
          showNotification('Failed to delete registration', 'error');
        }
      }
    );
  };

  const handleRegistrationUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationEditFormRef.current || !editingRegistration) return;

    setIsSubmitting(true);
    const formData = new FormData(registrationEditFormRef.current);
    const data = Object.fromEntries(formData);
    
    try {
      const response = await fetch(`/api/admin/registrations/${editingRegistration.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setIsEditingRegistration(false);
        setEditingRegistration(null);
        fetchRegistrations();
        showNotification('Registration details updated successfully');
      } else {
        showNotification('Failed to update registration', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('An error occurred', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVenueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const response = await fetch('/api/admin/venue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData))
      });
      if (response.ok) {
        fetchContent();
        alert('Venue updated successfully');
      }
    } catch (error) {
      console.error('Error updating venue:', error);
    }
  };

  const currentComp = COMPETITIONS.find(c => c.id === selectedComp);

  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-black">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030712]">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-primary/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-secondary/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-purple-500/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.main
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {/* Hero Section - Front Window Open Design */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 py-20">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                  className="w-[800px] h-[800px] border-[1px] border-brand-primary/30 rounded-full border-dashed"
                />
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[600px] h-[600px] border-[1px] border-brand-secondary/30 rounded-full border-dotted"
                />
              </div>

              <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-brand-primary" />
                    <span className="text-sm font-mono tracking-widest uppercase text-white/80">Department of AI & ML Presents</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9]">
                      NEURAL <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                        NEXUS
                      </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 max-w-xl font-light leading-relaxed">
                      Summit 2k26: A national level event challenging the boundaries of <span className="text-white font-medium">artificial intelligence</span> and <span className="text-white font-medium">creativity</span><motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-2 h-6 bg-cyan-400 ml-1 align-middle" />
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button 
                      onClick={() => {
                        const el = document.getElementById('competitions');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 uppercase tracking-widest text-sm group"
                    >
                      Explore Events 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => {
                        const el = document.getElementById('contact');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                    >
                      Contact Us
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="relative lg:h-[600px] flex items-center justify-center"
                >
                  {/* Glass Window Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 space-y-6">
                      <div className="glass-panel p-6 rounded-2xl border-white/10 bg-black/40 backdrop-blur-md transform -translate-y-4">
                        <div className="flex items-center gap-4 text-white/90 mb-4">
                          <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-brand-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-brand-primary font-mono uppercase tracking-widest mb-1">Date</p>
                            <p className="font-bold">23rd - 24th March 2026</p>
                          </div>
                        </div>
                        <div className="h-px w-full bg-white/10 my-4" />
                        <div className="flex items-center gap-4 text-white/90">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-xs text-purple-400 font-mono uppercase tracking-widest mb-1">Venue</p>
                            <p className="font-bold">{settings.venue_name || 'TGPCET Campus'}</p>
                            <p className="text-xs text-white/60 mt-1">{settings.venue_address || 'AI & ML Department'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating AI Elements */}
                  <motion.div 
                    animate={{ y: [-10, 10, -10] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 glass-panel p-4 rounded-2xl border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)] flex items-center gap-3"
                  >
                    <BrainCircuit className="w-6 h-6 text-cyan-400" />
                    <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">AI Powered</span>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [10, -10, 10] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-1/2 -left-8 glass-panel p-4 rounded-2xl border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)] flex items-center gap-3"
                  >
                    <Network className="w-6 h-6 text-purple-400" />
                    <span className="font-mono text-xs uppercase tracking-widest text-purple-400">Neural Net</span>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 pb-24">
              {/* Neural Activity Ticker */}
              <div className="w-full overflow-hidden py-4 border-y border-white/5 bg-white/[0.02] mb-20">
                <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center gap-8 px-4">
                      <span className="flex items-center gap-2 text-cyan-400 font-mono text-sm"><Sparkles className="w-4 h-4" /> AI MODELS INITIALIZED</span>
                      <span className="text-white/20">•</span>
                      <span className="flex items-center gap-2 text-purple-400 font-mono text-sm"><Network className="w-4 h-4" /> NEURAL NETWORKS SYNCED</span>
                      <span className="text-white/20">•</span>
                      <span className="flex items-center gap-2 text-blue-400 font-mono text-sm"><Terminal className="w-4 h-4" /> SYSTEM READY</span>
                      <span className="text-white/20">•</span>
                      <span className="flex items-center gap-2 text-emerald-400 font-mono text-sm"><BrainCircuit className="w-4 h-4" /> DEEP LEARNING ACTIVE</span>
                      <span className="text-white/20">•</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <section className="py-20 border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="glass-panel p-8 rounded-2xl border-white/5 hover:border-cyan-500/30 transition-colors group">
                    <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Terminal className="w-7 h-7 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Next-Gen Tech</h3>
                    <p className="text-white/60 leading-relaxed">Experience the latest in artificial intelligence, machine learning, and competitive programming.</p>
                  </div>
                  <div className="glass-panel p-8 rounded-2xl border-white/5 hover:border-purple-500/30 transition-colors group">
                    <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Globe className="w-7 h-7 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">National Level</h3>
                    <p className="text-white/60 leading-relaxed">Compete with the brightest minds from across the country in various technical and non-technical events.</p>
                  </div>
                  <div className="glass-panel p-8 rounded-2xl border-white/5 hover:border-blue-500/30 transition-colors group">
                    <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Trophy className="w-7 h-7 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Win Prizes</h3>
                    <p className="text-white/60 leading-relaxed">Showcase your skills, climb the leaderboards, and win exciting prizes and recognition.</p>
                  </div>
                </div>
              </section>

              {/* Competitions Grid */}
              <section id="competitions" className="space-y-12 pt-12">
              <div className="flex items-end justify-between">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] uppercase">Competitions</h2>
                <div className="h-px flex-1 mx-8 bg-white/10 hidden md:block" />
                <span className="font-mono text-white/40">04 EVENTS TOTAL</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {COMPETITIONS.map((comp) => (
                  <motion.div
                    key={comp.id}
                    whileHover={{ y: -8 }}
                    className="glass-panel p-8 group cursor-pointer relative overflow-hidden border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-500 flex flex-col"
                    onClick={() => {
                      setSelectedComp(comp.id);
                      setStep('register');
                    }}
                  >
                    <div className={cn(
                      "absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 blur-3xl opacity-20 transition-opacity group-hover:opacity-40 bg-gradient-to-br",
                      comp.color
                    )} />
                    
                    <comp.icon className="w-12 h-12 mb-6 text-brand-primary group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-500" />
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-500">{comp.name}</h3>
                    <p className="text-white/60 text-sm mb-6 leading-relaxed flex-1">
                      {comp.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                      <span className="text-xs font-mono text-white/40">{comp.date}</span>
                      <ChevronRight className="w-5 h-5 text-brand-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </div>
                    
                    {/* Competition Coordinators */}
                    {team.filter(t => t.competition_id === comp.id).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Coordinators</h4>
                        <div className="space-y-2">
                          {team.filter(t => t.competition_id === comp.id).map(member => (
                            <div key={member.id} className="flex items-center gap-2 text-xs">
                              {member.photo_url ? (
                                <img src={`/${member.photo_url}`} alt={member.name} className="w-6 h-6 rounded-full object-cover" />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                  <Users className="w-3 h-3 text-white/40" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-white/40">{member.phone}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Sponsors Section */}
            {sponsors.length > 0 && (
              <section className="mt-32 space-y-12">
                <div className="flex items-end justify-between">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] uppercase">Our Sponsors</h2>
                  <div className="h-px flex-1 mx-8 bg-white/10 hidden md:block" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {sponsors.map(sponsor => (
                    <div key={sponsor.id} className="glass-panel p-6 flex flex-col items-center justify-center text-center space-y-4 hover:bg-white/5 transition-colors">
                      {sponsor.logo_url ? (
                        <img src={`/${sponsor.logo_url}`} alt={sponsor.name} className="h-16 object-contain" />
                      ) : (
                        <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center">
                          <span className="text-2xl font-bold text-white/20">{sponsor.name[0]}</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold">{sponsor.name}</h3>
                        {sponsor.description && <p className="text-xs text-white/60 mt-1">{sponsor.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Feedback Section */}
            <section className="mt-32 space-y-12">
              <div className="flex items-end justify-between">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] uppercase">Summit Feedback</h2>
                <div className="h-px flex-1 mx-8 bg-white/10 hidden md:block" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-xl text-white/60 font-light">
                    We'd love to hear your thoughts on Neural Nexus 2k26. Your feedback helps us improve future summits.
                  </p>
                  <div className="space-y-4">
                    {feedback.slice(0, 3).map((f) => (
                      <div key={f.id} className="glass-panel p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm">{f.name}</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={cn("w-3 h-3", i < f.rating ? "text-brand-primary fill-brand-primary" : "text-white/10")} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-white/60 italic">"{f.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-8">
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const data = Object.fromEntries(formData);
                    try {
                      const response = await fetch('/api/feedback', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                      });
                      if (response.ok) {
                        const contentTypeHeader = response.headers.get("content-type");
                        if (contentTypeHeader && contentTypeHeader.includes("application/json")) {
                          await response.json(); // Consume the response
                        }
                        alert('Thank you for your feedback!');
                        (e.target as HTMLFormElement).reset();
                        fetchContent();
                      }
                    } catch (error) {
                      console.error('Error submitting feedback:', error);
                    }
                  }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-white/40 uppercase tracking-widest">Name</label>
                        <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-white/40 uppercase tracking-widest">Email</label>
                        <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-white/40 uppercase tracking-widest">Rating</label>
                      <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map((r) => (
                          <label key={r} className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="rating" value={r} required className="hidden peer" />
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 peer-checked:bg-brand-primary peer-checked:text-black transition-all group-hover:border-brand-primary/50">
                              {r}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-white/40 uppercase tracking-widest">Comment</label>
                      <textarea name="comment" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary resize-none" />
                    </div>
                    <button type="submit" className="w-full py-4 bg-brand-primary text-black font-bold rounded-xl hover:scale-[1.02] transition-transform">
                      Submit Feedback
                    </button>
                  </form>
                </div>
              </div>
            </section>

            {/* Footer Info */}
            <footer className="mt-32 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-5 gap-12 text-sm text-white/40">
              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-widest text-xs">Venue</h4>
                <p>{settings.venue_name || 'TGPCET Campus, 3rd Building, 4th Floor'}<br />{settings.venue_address || 'AI & ML Department, Mohgao, NH44 Wardha Road'}</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-widest text-xs">H.O.D AI & ML</h4>
                {team.filter(t => t.category === 'hod').length > 0 ? (
                  team.filter(t => t.category === 'hod').map(hod => (
                    <div key={hod.id} className="flex items-center gap-3">
                      {hod.photo_url && <img src={`/${hod.photo_url}`} alt={hod.name} className="w-8 h-8 rounded-full object-cover" />}
                      <div>
                        <p className="text-white">{hod.name}</p>
                        {hod.info && <p className="text-xs">{hod.info}</p>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Prof. Suraj Mahajan</p>
                )}
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-widest text-xs">Faculty Coordinators</h4>
                {team.filter(t => t.category === 'faculty').length > 0 ? (
                  <div className="space-y-3">
                    {team.filter(t => t.category === 'faculty').map(faculty => (
                      <div key={faculty.id} className="flex items-center gap-3">
                        {faculty.photo_url && <img src={`/${faculty.photo_url}`} alt={faculty.name} className="w-8 h-8 rounded-full object-cover" />}
                        <div>
                          <p className="text-white">{faculty.name}</p>
                          {faculty.phone && <p className="text-xs">{faculty.phone}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Prof. Shital Dandade<br />Prof. Pranay Dongarwar</p>
                )}
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-widest text-xs">Student Coordinators</h4>
                {team.filter(t => t.category === 'student').length > 0 ? (
                  <div className="space-y-3">
                    {team.filter(t => t.category === 'student').map(student => (
                      <div key={student.id} className="flex items-center gap-3">
                        {student.photo_url && <img src={`/${student.photo_url}`} alt={student.name} className="w-8 h-8 rounded-full object-cover" />}
                        <div>
                          <p className="text-white">{student.name}</p>
                          {student.phone && <p className="text-xs">{student.phone}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No student coordinators assigned yet.</p>
                )}
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-widest text-xs">Event Coordinators</h4>
                {team.filter(t => t.category === 'event_coordinator').length > 0 ? (
                  <div className="space-y-3">
                    {team.filter(t => t.category === 'event_coordinator').map(coordinator => (
                      <div key={coordinator.id} className="flex items-center gap-3">
                        {coordinator.photo_url && <img src={`/${coordinator.photo_url}`} alt={coordinator.name} className="w-8 h-8 rounded-full object-cover" />}
                        <div>
                          <p className="text-white">{coordinator.name}</p>
                          <p className="text-[10px] text-brand-primary uppercase tracking-widest">
                            {COMPETITIONS.find(c => c.id === coordinator.competition_id)?.name || 'General'}
                          </p>
                          {coordinator.phone && <p className="text-xs">{coordinator.phone}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Assigned per event.</p>
                )}
              </div>
            </footer>

            {/* Contact Details Section */}
            {contacts.length > 0 && (
              <div className="mt-12 pt-12 border-t border-white/5" id="contact">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] uppercase">
                      Contact Us
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contacts.map((contact, index) => (
                      <div 
                        key={contact.id} 
                        className={cn(
                          "glass-panel p-6 flex flex-col gap-4 rounded-2xl border transition-all duration-300",
                          index === 0 ? "border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]" : "border-white/10"
                        )}
                      >
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{contact.name || 'Contact'}</h3>
                          {contact.role && (
                            <p className="text-sm text-indigo-400">{contact.role}</p>
                          )}
                        </div>
                        
                        <div className="space-y-3 mt-2">
                          {contact.phone && (
                            <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                              <Phone className="w-5 h-5 text-white/40" />
                              <a href={`tel:${contact.phone}`} className="text-sm">{contact.phone}</a>
                            </div>
                          )}
                          {contact.email && (
                            <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                              <Mail className="w-5 h-5 text-white/40" />
                              <a href={`mailto:${contact.email}`} className="text-sm">{contact.email}</a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="max-w-7xl mx-auto px-4 py-12">
              <button 
                onClick={() => setStep('admin_login')}
                className="text-[10px] opacity-20 hover:opacity-100 transition-opacity block"
              >
                Admin Login
              </button>
            </div>
            </div>
          </motion.main>
        )}

        {step === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto px-6 py-12"
          >
            <button 
              onClick={() => setStep('landing')}
              className="mb-8 text-white/60 hover:text-white flex items-center gap-2 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
            </button>

            <div className="glass-panel p-8 md:p-12">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className={cn("p-3 rounded-xl bg-gradient-to-br", currentComp?.color)}>
                    {currentComp && <currentComp.icon className="w-6 h-6 text-white" />}
                  </div>
                  <h2 className="text-4xl font-bold">{currentComp?.name} Registration</h2>
                </div>
                <p className="text-white/60">Please fill out the details below to secure your spot.</p>
                {currentComp?.note && (
                  <div className="mt-4 p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl">
                    <p className="text-sm text-brand-primary font-medium">
                      <span className="font-bold uppercase tracking-wider text-[10px] mr-2">Note:</span>
                      {currentComp.note}
                    </p>
                  </div>
                )}
              </div>

              {currentComp?.rules && (
                <div className="mb-12 space-y-6">
                  <h3 className="text-2xl font-bold text-white">Rules & Guidelines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentComp.rules.map((ruleSection, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-cyan-400 mb-4">{ruleSection.title}</h4>
                        <ul className="space-y-2">
                          {ruleSection.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-white/70 text-sm flex items-start gap-2">
                              <span className="text-cyan-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-white/40 uppercase tracking-widest">
                      {currentComp?.id === 'e-sports' ? 'Squad Leader Name' : 'Full Name (Lead/Individual)'}
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                      <input 
                        required 
                        name="leadName"
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                      <input 
                        required 
                        name="email"
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                      <input 
                        required 
                        name="phone"
                        type="tel" 
                        placeholder="+91 0000000000"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Institution / University</label>
                    <div className="relative">
                      <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                      <input 
                        required 
                        name="institution"
                        type="text" 
                        placeholder="TGPCET, Nagpur"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Department</label>
                    <div className="relative">
                      <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                      <input 
                        required 
                        name="department"
                        type="text" 
                        placeholder="Computer Science, AI & ML"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                  </div>
                  {currentComp?.id === 'e-sports' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Leader IGN (In-Game Name)</label>
                        <input required name="lead_ign" type="text" placeholder="e.g. Ninja" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-brand-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Leader Character ID (UID)</label>
                        <input required name="lead_uid" type="text" placeholder="e.g. 5123456789" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-brand-primary transition-colors" />
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-6 pt-8 border-t border-white/5">
                  {currentComp?.id === 'e-sports' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-white/40 uppercase tracking-widest">E-Sports Type</label>
                        <select 
                          name="esportsType"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-brand-primary transition-colors appearance-none"
                        >
                          <option value="" className="bg-brand-dark">Select Type</option>
                          <option value="BGMI" className="bg-brand-dark">BGMI</option>
                          <option value="Free Fire" className="bg-brand-dark">Free Fire</option>
                        </select>
                      </div>

                      <h4 className="text-xl font-bold text-brand-primary border-b border-white/10 pb-2">Squad Members</h4>
                      
                      {/* Player 2 */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
                        <h5 className="font-bold text-white/80">Player 2</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input required name="p2_name" type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors" />
                          <input required name="p2_ign" type="text" placeholder="IGN" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors" />
                          <input required name="p2_uid" type="text" placeholder="Character ID" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors" />
                        </div>
                      </div>

                      {/* Player 3 */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
                        <h5 className="font-bold text-white/80">Player 3</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input required name="p3_name" type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors" />
                          <input required name="p3_ign" type="text" placeholder="IGN" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors" />
                          <input required name="p3_uid" type="text" placeholder="Character ID" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors" />
                        </div>
                      </div>

                      {/* Player 4 */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
                        <h5 className="font-bold text-white/80">Player 4</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input required name="p4_name" type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors" />
                          <input required name="p4_ign" type="text" placeholder="IGN" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors" />
                          <input required name="p4_uid" type="text" placeholder="Character ID" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors" />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentComp?.id === 'poster-panorama' && (
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Poster Theme</label>
                      <select 
                        name="posterTopic"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-brand-primary transition-colors appearance-none"
                      >
                        <option value="" className="bg-brand-dark">Select Theme</option>
                        <option value="Birth Of Artificial Consciousness" className="bg-brand-dark">Birth Of Artificial Consciousness</option>
                        <option value="AI in Space Exploration" className="bg-brand-dark">AI in Space Exploration</option>
                        <option value="Deepfake vs reality" className="bg-brand-dark">Deepfake vs reality</option>
                        <option value="AI in Cybersecurity" className="bg-brand-dark">AI in Cybersecurity</option>
                        <option value="The Day AI took over" className="bg-brand-dark">The Day AI took over</option>
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-mono text-white/40 uppercase tracking-widest">
                          {currentComp?.id === 'e-sports' ? 'Team Name' : 'Team Name (Optional)'}
                        </label>
                        <button
                          type="button"
                          onClick={handleGenerateTeamName}
                          disabled={isGeneratingTeamName}
                          className="text-xs flex items-center gap-1 text-brand-secondary hover:text-brand-primary transition-colors disabled:opacity-50"
                        >
                          <Sparkles className="w-3 h-3" />
                          {isGeneratingTeamName ? 'Generating...' : 'AI Suggestion'}
                        </button>
                      </div>
                      <input 
                        name="teamName"
                        type="text" 
                        required={currentComp?.id === 'e-sports'}
                        placeholder={currentComp?.id === 'e-sports' ? "e.g. Neural Knights" : "Team Name"}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-brand-primary transition-colors"
                      />
                      {generatedTeamNames.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {generatedTeamNames.map((name, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                const input = formRef.current?.elements.namedItem('teamName') as HTMLInputElement;
                                if (input) input.value = name;
                              }}
                              className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 transition-colors"
                            >
                              {name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {currentComp?.id !== 'e-sports' && (
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Number of Teammates</label>
                        <select 
                          name="teammatesCount"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-brand-primary transition-colors appearance-none"
                        >
                          {[...Array(currentComp?.maxTeam || 1)].map((_, i) => (
                            <option key={i} value={i + 1} className="bg-brand-dark">{i + 1}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {currentComp?.id !== 'e-sports' && (
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Teammates Names (Semicolon separated)</label>
                      <textarea 
                        name="teammatesNames"
                        placeholder="Jane Doe; Bob Smith"
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                      />
                    </div>
                  )}
                </div>

                {/* Payment Section */}
                <div className="space-y-8 pt-8 border-t border-white/5">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="glass-panel p-4 bg-white">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=boim-870251790154@boi&pn=TGPCET&cu=INR" 
                        alt="Payment QR Code"
                        className="w-32 h-32"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="text-xl font-bold flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-brand-primary" />
                        Scan to Pay
                      </h4>
                      <p className="text-white/60 text-sm">
                        Scan the QR code to pay the registration fee. Our AI will automatically verify your payment screenshot.
                        <br />
                        <span className="text-brand-primary font-bold">
                          {currentComp?.fees.individual 
                            ? `Fee: ₹${currentComp.fees.individual} (Individual) / ₹${currentComp.fees.team} (Team)` 
                            : `Fee: ₹${currentComp?.fees.team} (Team)`}
                        </span>
                      </p>
                      <p className="text-xs font-mono text-white/30">UPI ID: boim-870251790154@boi</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Upload Payment Screenshot</label>
                    <div 
                      onClick={() => document.getElementById('file-upload')?.click()}
                      className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-brand-primary/50 cursor-pointer transition-colors group"
                    >
                      <input 
                        id="file-upload"
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="max-h-48 rounded-lg" />
                      ) : (
                        <>
                          <div className="p-4 rounded-full bg-white/5 group-hover:bg-brand-primary/10 transition-colors">
                            <Upload className="w-8 h-8 text-white/40 group-hover:text-brand-primary transition-colors" />
                          </div>
                          <div className="text-center">
                            <p className="font-medium">Click to upload or drag and drop</p>
                            <p className="text-sm text-white/40">PNG, JPG up to 10MB</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Transaction ID / UTR Number</label>
                    <input 
                      required 
                      name="transactionId"
                      type="text" 
                      placeholder="e.g. 123456789012"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-brand-primary transition-colors"
                    />
                    <p className="text-xs text-white/40">Please enter the unique 12-digit transaction ID from your payment app.</p>
                  </div>
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-5 bg-brand-primary text-black font-bold text-lg rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Processing & Verifying...
                    </>
                  ) : (
                    <>
                      Complete Registration <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto px-6 py-24 text-center"
          >
            <div className="glass-panel p-12 space-y-8">
              <div className={clsx(
                "w-20 h-20 rounded-full flex items-center justify-center mx-auto",
                registrationStatus === 'approved' ? "bg-green-500/20" : 
                registrationStatus === 'rejected' ? "bg-red-500/20" : "bg-brand-primary/20"
              )}>
                {registrationStatus === 'approved' ? (
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                ) : registrationStatus === 'rejected' ? (
                  <XCircle className="w-10 h-10 text-red-500" />
                ) : (
                  <Clock className="w-10 h-10 text-brand-primary" />
                )}
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">
                  {registrationStatus === 'approved' ? "Registration Approved!" : 
                   registrationStatus === 'rejected' ? "Payment Rejected" : "Registration Received"}
                </h2>
                <p className="text-white/60">
                  {registrationStatus === 'approved' ? (
                    `Your registration for ${currentComp?.name} has been received and your payment was automatically verified by our AI. We'll send a confirmation email shortly.`
                  ) : registrationStatus === 'rejected' ? (
                    `Your registration for ${currentComp?.name} was received, but our AI could not verify the payment screenshot. Please ensure the amount and transaction ID are correct. An admin will review this manually.`
                  ) : (
                    `Your registration for ${currentComp?.name} has been received. Our team will review your payment and send a confirmation email shortly.`
                  )}
                </p>
              </div>
              <button 
                onClick={() => setStep('landing')}
                className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors"
              >
                Return to Home
              </button>
            </div>
          </motion.div>
        )}

        {step === 'admin_login' && (
          <motion.div
            key="admin_login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto px-6 py-24"
          >
            <div className="glass-panel p-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Admin Access</h2>
                <p className="text-white/60 text-sm">Enter your authorized email to continue.</p>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                    <input 
                      required 
                      type="email" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>
                  {loginError && <p className="text-red-500 text-xs">{loginError}</p>}
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-brand-primary text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Login
                </button>
              </form>
              <button 
                onClick={() => setStep('landing')}
                className="w-full text-sm text-white/40 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {step === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto px-6 py-12"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold">Admin Portal</h2>
                <p className="text-white/60">Manage registrations and website content</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex bg-white/5 rounded-xl p-1">
                  <button 
                    onClick={() => setActiveAdminTab('registrations')}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      activeAdminTab === 'registrations' ? "bg-brand-primary text-black" : "text-white/60 hover:text-white"
                    )}
                  >
                    Registrations
                  </button>
                  <button 
                    onClick={() => setActiveAdminTab('content')}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      activeAdminTab === 'content' ? "bg-brand-primary text-black" : "text-white/60 hover:text-white"
                    )}
                  >
                    Website Content
                  </button>
                  <button 
                    onClick={() => setActiveAdminTab('feedback')}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      activeAdminTab === 'feedback' ? "bg-brand-primary text-black" : "text-white/60 hover:text-white"
                    )}
                  >
                    Feedback
                  </button>
                </div>
                <button 
                  onClick={() => setStep('landing')}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>

            {activeAdminTab === 'registrations' ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                  <div className="glass-panel p-6 space-y-4">
                    <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest">Export All</h3>
                    <a 
                      href="/api/admin/export" 
                      className="flex items-center justify-between p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl hover:bg-brand-primary/20 transition-colors"
                    >
                      <span className="font-bold text-brand-primary">Full Report</span>
                      <Upload className="w-5 h-5 rotate-180" />
                    </a>
                  </div>
                  {COMPETITIONS.map(comp => (
                    <div key={comp.id} className="glass-panel p-6 space-y-4">
                      <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest">{comp.name}</h3>
                      <a 
                        href={`/api/admin/export/${comp.id}`}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <span className="font-bold">Excel Set</span>
                        <Upload className="w-5 h-5 rotate-180" />
                      </a>
                    </div>
                  ))}
                  <div className="glass-panel p-6 space-y-4">
                    <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest">BGMI Only</h3>
                    <a 
                      href="/api/admin/export-esports/BGMI"
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <span className="font-bold text-brand-primary">Excel Set</span>
                      <Upload className="w-5 h-5 rotate-180 text-brand-primary" />
                    </a>
                  </div>
                  <div className="glass-panel p-6 space-y-4">
                    <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest">Free Fire Only</h3>
                    <a 
                      href="/api/admin/export-esports/Free Fire"
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <span className="font-bold text-brand-primary">Excel Set</span>
                      <Upload className="w-5 h-5 rotate-180 text-brand-primary" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="glass-panel p-4 border-l-4 border-white/20">
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Total</div>
                    <div className="text-2xl font-bold">{registrations.length}</div>
                  </div>
                  <div className="glass-panel p-4 border-l-4 border-amber-500/50">
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Pending</div>
                    <div className="text-2xl font-bold text-amber-500">
                      {registrations.filter(r => (r.payment_status || 'pending') === 'pending').length}
                    </div>
                  </div>
                  <div className="glass-panel p-4 border-l-4 border-emerald-500/50">
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Approved</div>
                    <div className="text-2xl font-bold text-emerald-500">
                      {registrations.filter(r => r.payment_status === 'approved').length}
                    </div>
                  </div>
                  <div className="glass-panel p-4 border-l-4 border-red-500/50">
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Rejected</div>
                    <div className="text-2xl font-bold text-red-500">
                      {registrations.filter(r => r.payment_status === 'rejected').length}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex bg-white/5 rounded-xl p-1">
                    {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-xs font-medium transition-colors capitalize",
                          statusFilter === status ? "bg-brand-primary text-black" : "text-white/60 hover:text-white"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search registrations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="glass-panel overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-white/5 text-xs font-mono text-white/40 uppercase tracking-widest">
                        <tr>
                          <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('lead_name')}>
                            <div className="flex items-center gap-1">
                              Lead Name
                              {sortConfig?.key === 'lead_name' && (sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                            </div>
                          </th>
                          <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('email')}>
                            <div className="flex items-center gap-1">
                              Email
                              {sortConfig?.key === 'email' && (sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                            </div>
                          </th>
                          <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('created_at')}>
                            <div className="flex items-center gap-1">
                              Date
                              {sortConfig?.key === 'created_at' && (sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                            </div>
                          </th>
                          <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('competition')}>
                            <div className="flex items-center gap-1">
                              Competition
                              {sortConfig?.key === 'competition' && (sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                            </div>
                          </th>
                          <th className="px-6 py-4">Team</th>
                          <th className="px-6 py-4">Theme/Type</th>
                          <th className="px-6 py-4">Phone</th>
                          <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('institution')}>
                            <div className="flex items-center gap-1">
                              Institution & Dept
                              {sortConfig?.key === 'institution' && (sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                            </div>
                          </th>
                          <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('transaction_id')}>
                            <div className="flex items-center gap-1">
                              Txn ID
                              {sortConfig?.key === 'transaction_id' && (sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                            </div>
                          </th>
                          <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('payment_screenshot')}>
                            <div className="flex items-center gap-1">
                              Payment
                              {sortConfig?.key === 'payment_screenshot' && (sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                            </div>
                          </th>
                          <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('payment_status')}>
                            <div className="flex items-center gap-1">
                              Payment Status
                              {sortConfig?.key === 'payment_status' && (sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                            </div>
                          </th>
                          <th className="px-6 py-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {sortedRegistrations.map((reg) => (
                          <tr key={reg.id} className="even:bg-white/[0.02] hover:bg-white/10 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-bold">{reg.lead_name}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-xs text-white/40">{reg.email}</div>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              {new Date(reg.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-md border border-brand-primary/20">
                                {COMPETITIONS.find(c => c.id === reg.competition)?.name || reg.competition}
                                {reg.esports_type && ` - ${reg.esports_type}`}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm">{reg.team_name || '-'}</div>
                              <div className="text-xs text-white/40">{reg.teammates_count} members</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-xs font-mono text-white/60">
                                {reg.poster_topic || reg.esports_type || '-'}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm">{reg.phone}</td>
                            <td className="px-6 py-4 text-sm truncate max-w-[150px]">
                              <div className="font-bold">{reg.institution}</div>
                              <div className="text-xs text-white/40">{reg.department || '-'}</div>
                            </td>
                            <td className="px-6 py-4 text-sm font-mono text-white/80">
                              {reg.transaction_id || '-'}
                            </td>
                            <td className="px-6 py-4">
                              {reg.payment_screenshot ? (
                                <button 
                                  onClick={() => setViewingProof(`/${reg.payment_screenshot}`)}
                                  className="text-brand-primary hover:underline text-xs cursor-pointer"
                                >
                                  View Proof
                                </button>
                              ) : (
                                <span className="text-red-500 text-xs">Missing</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <select 
                                value={reg.payment_status || 'pending'}
                                onChange={(e) => handleStatusUpdate(reg.id, e.target.value)}
                                className={cn(
                                  "text-xs font-bold px-2 py-1 rounded-md border bg-transparent focus:outline-none transition-colors",
                                  reg.payment_status === 'approved' ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" :
                                  reg.payment_status === 'rejected' ? "text-red-500 border-red-500/20 bg-red-500/10" :
                                  "text-amber-500 border-amber-500/20 bg-amber-500/10"
                                )}
                              >
                                <option value="pending" className="bg-brand-dark text-amber-500">Pending</option>
                                <option value="approved" className="bg-brand-dark text-emerald-500">Approved</option>
                                <option value="rejected" className="bg-brand-dark text-red-500">Rejected</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => { setEditingRegistration(reg); setIsEditingRegistration(true); }}
                                  className="text-brand-primary hover:text-brand-primary/80 p-2 rounded-lg hover:bg-brand-primary/10 transition-colors"
                                  title="Edit Details"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteRegistration(reg.id)}
                                  className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                  title="Delete Registration"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : activeAdminTab === 'content' ? (
              <div className="space-y-12">
                {/* Venue Settings */}
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-6">Venue Details</h3>
                  <form onSubmit={handleVenueSubmit} className="space-y-4 max-w-2xl">
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Venue Name</label>
                      <input 
                        name="venue_name"
                        defaultValue={settings.venue_name}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Venue Address</label>
                      <input 
                        name="venue_address"
                        defaultValue={settings.venue_address}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                    <button type="submit" className="px-6 py-3 bg-brand-primary text-black font-bold rounded-xl hover:scale-[1.02] transition-transform">
                      Save Venue
                    </button>
                  </form>
                </div>

                {/* Team Management */}
                <div className="glass-panel p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Team & Coordinators</h3>
                    <button 
                      onClick={() => { setContentType('team'); setEditingItem(null); setIsAddingContent(true); }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                    >
                      + Add Member
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {team.map(member => (
                      <div key={member.id} className="bg-white/5 rounded-xl p-4 flex items-start justify-between">
                        <div className="flex gap-4">
                          {member.photo_url ? (
                            <img src={`/${member.photo_url}`} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                              <Users className="w-6 h-6 text-white/40" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold">{member.name}</h4>
                            <p className="text-xs text-brand-primary uppercase tracking-wider">
                              {member.category === 'hod' ? 'H.O.D' : 
                               member.category === 'faculty' ? 'Faculty Coordinator' :
                               member.category === 'student' ? 'Student Coordinator' :
                               'Event Coordinator'}
                            </p>
                            {member.competition_id && <p className="text-xs text-white/60 mt-1">Event: {COMPETITIONS.find(c => c.id === member.competition_id)?.name}</p>}
                            <p className="text-xs text-white/40 mt-1">{member.phone}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => { setContentType('team'); setEditingItem(member); setIsAddingContent(true); }}
                            className="text-brand-primary hover:text-brand-primary/80 p-1"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteContent('team', member.id)} className="text-red-500 hover:text-red-400 p-1">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sponsors Management */}
                <div className="glass-panel p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Sponsors</h3>
                    <button 
                      onClick={() => { setContentType('sponsor'); setEditingItem(null); setIsAddingContent(true); }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                    >
                      + Add Sponsor
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sponsors.map(sponsor => (
                      <div key={sponsor.id} className="bg-white/5 rounded-xl p-4 relative group">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setContentType('sponsor'); setEditingItem(sponsor); setIsAddingContent(true); }}
                            className="text-brand-primary hover:text-brand-primary/80 p-1 bg-brand-dark/80 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteContent('sponsors', sponsor.id)} 
                            className="text-red-500 hover:text-red-400 p-1 bg-brand-dark/80 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                          {sponsor.logo_url ? (
                            <img src={`/${sponsor.logo_url}`} alt={sponsor.name} className="h-12 object-contain" />
                          ) : (
                            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                              <span className="font-bold text-white/40">{sponsor.name[0]}</span>
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-sm">{sponsor.name}</h4>
                            {sponsor.description && <p className="text-xs text-white/40 mt-1">{sponsor.description}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prize Pools Management */}
                <div className="glass-panel p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Prize Pools</h3>
                    <button 
                      onClick={() => { setContentType('prize_pool'); setEditingItem(null); setIsAddingContent(true); }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                    >
                      + Add Prize Pool
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {prizePools.map(pool => (
                      <div key={pool.id} className="bg-white/5 rounded-xl p-6 relative group border border-white/10 hover:border-brand-primary/50 transition-colors">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setContentType('prize_pool'); setEditingItem(pool); setIsAddingContent(true); }}
                            className="text-brand-primary hover:text-brand-primary/80 p-1 bg-brand-dark/80 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteContent('prize_pools', pool.id)} 
                            className="text-red-500 hover:text-red-400 p-1 bg-brand-dark/80 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                              <Trophy className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">{pool.title}</h4>
                            </div>
                          </div>
                          <div>
                            <p className="text-3xl font-bold text-brand-primary">{pool.amount}</p>
                            {pool.description && <p className="text-sm text-white/60 mt-2">{pool.description}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contacts Management */}
                <div className="glass-panel p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Contact Details</h3>
                    <button 
                      onClick={() => { setContentType('contact'); setEditingItem(null); setIsAddingContent(true); }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                    >
                      + Add Contact
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contacts.map(contact => (
                      <div key={contact.id} className="bg-white/5 rounded-xl p-4 flex items-center justify-between group">
                        <div className="flex flex-col gap-2">
                          <div>
                            <h4 className="font-bold text-sm">{contact.name || 'Contact'}</h4>
                            {contact.role && <p className="text-xs text-brand-primary">{contact.role}</p>}
                          </div>
                          <div className="space-y-1 mt-2">
                            {contact.phone && (
                              <div className="flex items-center gap-2 text-xs text-white/60">
                                <Phone className="w-3 h-3" /> {contact.phone}
                              </div>
                            )}
                            {contact.email && (
                              <div className="flex items-center gap-2 text-xs text-white/60">
                                <Mail className="w-3 h-3" /> {contact.email}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setContentType('contact'); setEditingItem(contact); setIsAddingContent(true); }}
                            className="text-brand-primary hover:text-brand-primary/80 p-1"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteContent('contacts', contact.id)} className="text-red-500 hover:text-red-400 p-1">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Participant Feedback</h3>
                  <span className="text-sm font-mono text-white/40">{feedback.length} TOTAL ENTRIES</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feedback.map((f) => (
                    <div key={f.id} className="glass-panel p-6 space-y-4 relative group">
                      <button 
                        onClick={() => handleDeleteFeedback(f.id)}
                        className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold">{f.name}</h4>
                          <p className="text-xs text-white/40">{f.email}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("w-3 h-3", i < f.rating ? "text-brand-primary fill-brand-primary" : "text-white/10")} />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm text-white/80 leading-relaxed">
                        {f.comment}
                      </p>
                      
                      <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                        Submitted on {new Date(f.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                
                {feedback.length === 0 && (
                  <div className="glass-panel p-12 text-center space-y-4">
                    <MessageSquare className="w-12 h-12 text-white/10 mx-auto" />
                    <p className="text-white/40">No feedback received yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Add Content Modal */}
            <AnimatePresence>
              {isAddingContent && contentType && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                  onClick={() => setIsAddingContent(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    className="relative max-w-lg w-full glass-panel p-8" 
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setIsAddingContent(false)}
                      className="absolute top-4 right-4 text-white/60 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <h3 className="text-2xl font-bold mb-6">
                      {editingItem ? 'Edit' : 'Add'} {contentType === 'team' ? 'Team Member' : contentType === 'sponsor' ? 'Sponsor' : contentType === 'prize_pool' ? 'Prize Pool' : 'Contact Detail'}
                    </h3>

                    <form ref={contentFormRef} onSubmit={handleContentSubmit} className="space-y-4">
                      {contentType === 'team' ? (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Role/Category</label>
                            <select name="category" required defaultValue={editingItem?.category} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary">
                              <option value="hod" className="bg-brand-dark">H.O.D</option>
                              <option value="faculty" className="bg-brand-dark">Faculty Coordinator</option>
                              <option value="student" className="bg-brand-dark">Student Coordinator</option>
                              <option value="event_coordinator" className="bg-brand-dark">Event Specific Coordinator</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Event (If Event Coordinator)</label>
                            <select name="competition_id" defaultValue={editingItem?.competition_id || ""} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary">
                              <option value="" className="bg-brand-dark">None</option>
                              {COMPETITIONS.map(c => (
                                <option key={c.id} value={c.id} className="bg-brand-dark">{c.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Name</label>
                            <input name="name" required type="text" defaultValue={editingItem?.name} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Phone</label>
                            <input name="phone" type="text" defaultValue={editingItem?.phone} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Photo</label>
                            <input name="photo" type="file" accept="image/*" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                        </>
                      ) : contentType === 'sponsor' ? (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Sponsor Name</label>
                            <input name="name" required type="text" defaultValue={editingItem?.name} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Description / Tagline</label>
                            <input name="description" type="text" defaultValue={editingItem?.description} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Logo</label>
                            <input name="logo" type="file" accept="image/*" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                        </>
                      ) : contentType === 'prize_pool' ? (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Title</label>
                            <input name="title" required placeholder="e.g., 1st Prize" type="text" defaultValue={editingItem?.title} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Amount</label>
                            <input name="amount" required placeholder="e.g., ₹5,000" type="text" defaultValue={editingItem?.amount} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Description (Optional)</label>
                            <input name="description" type="text" defaultValue={editingItem?.description} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Name</label>
                            <input name="name" required type="text" defaultValue={editingItem?.name} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Role (Optional)</label>
                            <input name="role" type="text" defaultValue={editingItem?.role} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Phone</label>
                            <input name="phone" type="text" defaultValue={editingItem?.phone} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Email</label>
                            <input name="email" type="email" defaultValue={editingItem?.email} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                        </>
                      )}
                      
                      <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full py-4 bg-brand-primary text-black font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 mt-6"
                      >
                        {isSubmitting ? 'Saving...' : editingItem ? 'Update Content' : 'Save Content'}
                      </button>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Image Modal */}
            <AnimatePresence>
              {viewingProof && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                  onClick={() => setViewingProof(null)}
                >
                  <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center" 
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setViewingProof(null)}
                      className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors flex items-center gap-2 font-mono text-sm uppercase tracking-widest"
                    >
                      Close <X className="w-5 h-5" />
                    </button>
                    <img
                      src={viewingProof}
                      alt="Payment Proof"
                      className="max-w-full max-h-[85vh] object-contain rounded-xl border border-white/10 shadow-2xl bg-brand-dark/50"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Edit Registration Modal */}
            <AnimatePresence>
              {isEditingRegistration && editingRegistration && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                  onClick={() => setIsEditingRegistration(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    className="relative max-w-2xl w-full glass-panel p-8 max-h-[90vh] overflow-y-auto" 
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setIsEditingRegistration(false)}
                      className="absolute top-4 right-4 text-white/60 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <h3 className="text-2xl font-bold mb-6">Edit Registration Details</h3>

                    <form ref={registrationEditFormRef} onSubmit={handleRegistrationUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Lead Name</label>
                          <input name="lead_name" required type="text" defaultValue={editingRegistration.lead_name} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Email</label>
                          <input name="email" required type="email" defaultValue={editingRegistration.email} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Phone</label>
                          <input name="phone" required type="text" defaultValue={editingRegistration.phone} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Team Name</label>
                          <input name="team_name" type="text" defaultValue={editingRegistration.team_name} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Institution</label>
                          <input name="institution" required type="text" defaultValue={editingRegistration.institution} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Department</label>
                          <input name="department" type="text" defaultValue={editingRegistration.department} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Transaction ID</label>
                          <input name="transaction_id" type="text" defaultValue={editingRegistration.transaction_id} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Teammates Count</label>
                          <input name="teammates_count" type="number" defaultValue={editingRegistration.teammates_count} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                        </div>
                        {editingRegistration.competition === 'e-sports' && (
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">E-Sports Type</label>
                            <input name="esports_type" type="text" defaultValue={editingRegistration.esports_type} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                        )}
                        {editingRegistration.competition === 'poster-panorama' && (
                          <div className="space-y-2">
                            <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Poster Topic</label>
                            <input name="poster_topic" type="text" defaultValue={editingRegistration.poster_topic} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Teammates Names</label>
                        <textarea name="teammates_names" rows={3} defaultValue={editingRegistration.teammates_names} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-primary resize-none" />
                      </div>
                      
                      <button 
                        disabled={isSubmitting}
                        type="submit" 
                        className="w-full py-4 bg-brand-primary text-black font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
                      >
                        {isSubmitting ? 'Saving...' : 'Update Registration Details'}
                      </button>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Confirmation Dialog */}
            <AnimatePresence>
              {confirmDialog?.isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="max-w-md w-full glass-panel p-8 text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto text-red-500">
                      <X className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">{confirmDialog.title}</h3>
                      <p className="text-white/60">{confirmDialog.message}</p>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setConfirmDialog(null)}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => { confirmDialog.onConfirm(); setConfirmDialog(null); }}
                        className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notifications */}
            <AnimatePresence>
              {notification && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className={cn(
                    "fixed bottom-8 right-8 z-[70] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-md",
                    notification.type === 'success' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-red-500/10 border-red-500/20 text-red-500"
                  )}
                >
                  {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  <span className="font-medium">{notification.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chatbot UI (Only on landing page) */}
      {step === 'landing' && (
        <div className="fixed bottom-8 right-8 z-50">
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="absolute bottom-16 right-0 w-80 sm:w-96 bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                style={{ height: '500px', maxHeight: '80vh' }}
              >
                <div className="p-4 border-b border-white/10 bg-brand-primary/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Nexus AI</h3>
                      <p className="text-[10px] text-white/60">Neural Nexus Assistant</p>
                    </div>
                  </div>
                  <button onClick={() => setIsChatOpen(false)} className="text-white/60 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
                      <div className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm relative group",
                        msg.role === 'user' ? "bg-brand-primary text-black rounded-br-none" : "bg-white/10 text-white rounded-bl-none"
                      )}>
                        {msg.text}
                      </div>
                      {msg.timestamp && (
                        <span className="text-[10px] text-white/40 mt-1 px-1">
                          {msg.timestamp}
                        </span>
                      )}
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex flex-col items-start">
                      <div className="bg-white/10 text-white/60 rounded-2xl rounded-bl-none px-4 py-3 text-sm flex items-center gap-1.5 w-fit">
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                      <span className="text-[10px] text-white/40 mt-1 px-1 italic">Nexus is typing...</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/10 bg-black/20">
                  <div className="relative">
                    <input
                      type="text"
                      value={currentChatMessage}
                      onChange={(e) => setCurrentChatMessage(e.target.value)}
                      placeholder="Ask me anything about the event..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-brand-primary transition-colors placeholder:text-white/40"
                    />
                    <button
                      type="submit"
                      disabled={!currentChatMessage.trim() || isChatLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-brand-primary text-black rounded-lg disabled:opacity-50 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-14 h-14 bg-brand-primary text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform relative group"
          >
            {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            {!isChatOpen && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-brand-dark animate-pulse" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
