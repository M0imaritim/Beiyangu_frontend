// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiService from "@/services/api";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const response = await apiService.get("/auth/me/");
        if (response.success && response.user) {
          setUser(response.user);
          // Redirect to dashboard if user is authenticated
          router.push("/dashboard");
        }
      } catch (error) {
        console.log("User not authenticated");
        // User not authenticated, stay on landing page
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-secondary shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Beiyangu</h1>
              <span className="ml-2 text-sm text-gray-300">Your Price</span>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/auth/login"
                className="text-white hover:text-primary hover:border-b-2 hover:border-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">
            The Reverse
            <span className="text-secondary"> Marketplace</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-muted sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Post what you need, get competitive bids from sellers, and pay only
            when satisfied. Turn the tables on traditional buying.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/auth/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Start Buying
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/auth/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-primary text-base font-medium rounded-md text-primary bg-card hover:bg-primary hover:text-white md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Start Selling
              </Link>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-20 bg-card rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-primary">
              How Beiyangu Works
            </h2>
            <p className="mt-4 text-lg text-muted">
              Simple, secure, and fair for everyone
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-primary">
                Post Your Request
              </h3>
              <p className="mt-2 text-base text-muted">
                Describe what you need and set your budget. Be specific about
                requirements and timeline.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white mx-auto">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-primary">
                Receive Bids
              </h3>
              <p className="mt-2 text-base text-muted">
                Sellers compete for your business with competitive offers and
                proposals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-primary">
                Pay on Delivery
              </h3>
              <p className="mt-2 text-base text-muted">
                Funds are held securely until you confirm the work is completed
                to your satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-secondary rounded-lg">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Join thousands of buyers and sellers already using Beiyangu
              </p>
              <div className="mt-8">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-secondary bg-primary hover:bg-primary-dark transition-colors"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary border-t border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-300 text-sm">
            © 2025 Beiyangu. Built with Django & Next.js.
          </div>
        </div>
      </footer>
    </div>
  );
}
