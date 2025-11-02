import { Metadata } from 'next';
import { ContentTransition } from '@/components/animations/RouteTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Marvel Rivals HQ - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16">
        <ContentTransition>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">
                <span className="text-[#E10600]">Privacy</span> Policy
              </h1>
              <p className="text-xl text-zinc-400">
                Last updated: January 8, 2025
              </p>
            </div>

            <div className="space-y-8">
              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">1. Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <p className="text-zinc-300 leading-relaxed">
                      We may collect personal information that you voluntarily provide to us when you:
                    </p>
                    <ul className="list-disc list-inside text-zinc-300 mt-2 space-y-1">
                      <li>Create an account or profile</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Contact us through our contact forms</li>
                      <li>Participate in community discussions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Usage Information</h3>
                    <p className="text-zinc-300 leading-relaxed">
                      We automatically collect certain information about your device and usage of our service, including:
                    </p>
                    <ul className="list-disc list-inside text-zinc-300 mt-2 space-y-1">
                      <li>IP address and browser information</li>
                      <li>Pages visited and time spent on our site</li>
                      <li>Referring websites and search terms</li>
                      <li>Device type and operating system</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">2. How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc list-inside text-zinc-300 space-y-2">
                    <li>Providing and maintaining our service</li>
                    <li>Personalizing your experience on our website</li>
                    <li>Sending you updates about Marvel Rivals content and features</li>
                    <li>Responding to your comments, questions, and requests</li>
                    <li>Analyzing usage patterns to improve our service</li>
                    <li>Detecting and preventing fraud or abuse</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">3. Information Sharing and Disclosure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-zinc-300 space-y-2">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations or court orders</li>
                    <li>To protect our rights, property, or safety</li>
                    <li>With service providers who assist in operating our website</li>
                    <li>In connection with a merger, acquisition, or sale of assets</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">4. Data Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">5. Cookies and Tracking Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences. Types of cookies we use include:
                  </p>
                  <ul className="list-disc list-inside text-zinc-300 space-y-2">
                    <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
                    <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                    <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">6. Your Rights and Choices</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside text-zinc-300 space-y-2">
                    <li>Access and receive a copy of your personal information</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Delete your personal information</li>
                    <li>Restrict or object to processing of your information</li>
                    <li>Data portability</li>
                    <li>Withdraw consent where processing is based on consent</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">7. Children&apos;s Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed">
                    Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">8. Changes to This Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically for any changes.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">9. Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <div className="text-zinc-300 space-y-2">
                    <p><strong>Email:</strong> privacy@marvelrivalz.com</p>
                    <p><strong>Address:</strong> Apt 504, 5th Floor, Gulberg Heights, Gulberg Greens, Islamabad, Pakistan, 44000</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ContentTransition>
      </div>
    </div>
  );
}