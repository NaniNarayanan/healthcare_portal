import Accordion from "../components/Accordion";

const sampleThreads = [
  {
    id: "t1",
    title: "Lab results available",
    subtitle: "Dr. Smith · 2 hrs ago",
    content: () => (
      <div>
        <p className="mb-2">Your blood test results are ready. All parameters are within normal range.</p>
        <a className="text-indigo-600 hover:underline" href="#">View details</a>
      </div>
    ),
  },
  {
    id: "t2",
    title: "Follow-up appointment",
    subtitle: "Nurse · Yesterday",
    content: "Please schedule a follow-up appointment for next week. Call 555-1234 or use the portal.",
  },
  {
    id: "t3",
    title: "Prescription ready",
    subtitle: "Pharmacy · 3 days ago",
    content: "Your prescription for Metformin is ready for pickup.",
  },
];

export default function Messages() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <p className="mb-4 text-sm text-gray-600">Communicate with your healthcare provider.</p>

      <Accordion items={sampleThreads} allowMultiple={false} />
    </div>
  );
}
