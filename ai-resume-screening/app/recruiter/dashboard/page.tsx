"use client";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, SearchIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export default function RecruiterDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    const storedUserId = searchParams.get("userId");
    setUserId(storedUserId);
  }, []);
  const jobs = [
    { id: 1, title: "Software Engineer", applicants: 25, newApplicants: 5 },
    { id: 2, title: "Data Scientist", applicants: 18, newApplicants: 3 },
    { id: 3, title: "UX Designer", applicants: 30, newApplicants: 8 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Post New Job</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link
                href={{
                  pathname: "/recruiter/post-job",
                  query: { userId },
                }}
              >
                <PlusIcon className="mr-2 h-4 w-4" /> Post New Job
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Job Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline">
                <SearchIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">73</p>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mb-4">Active Job Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Total Applicants: {job.applicants}
                  </span>
                  <span className="text-sm font-medium text-green-500">
                    New: +{job.newApplicants}
                  </span>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/recruiter/job/${job.id}`}>
                    <UsersIcon className="mr-2 h-4 w-4" /> View Applicants
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
