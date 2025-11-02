import { Metadata } from 'next';
import { ContentTransition } from '@/components/animations/RouteTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Marvel Rivals HQ - Learn about the rules and guidelines for using our platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16">
        <ContentTransition>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">
                <span className="text-[#E10600]">Terms</span> of Service
              </h1>
              <p className="text-xl text-zinc-400">
                Last updated: January 8, 2025
              </p>
            </div>

            <div className="space-y-8">
              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">1. Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed">
                    By accessing and using Marvel Rivals HQ (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. These Terms of Service (&quot;Terms&quot;) govern your use of our website located at marvelrivalz.com and any related services provided by Marvel Rivals HQ.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">2. Description of Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    Marvel Rivals HQ provides:
                  </p>
                  <ul className="list-disc list-inside text-zinc-300 space-y-2">
                    <li>Game guides, tutorials, and educational content for Marvel Rivals</li>
                    <li>Agent, weapon, and map information and statistics</li>
                    <li>Community features including leaderboards and player profiles</li>
                    <li>Master classes and structured learning content</li>
                    <li>News and updates about Marvel Rivals</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">3. User Accounts and Registration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Account Creation</h3>
                    <p className="text-zinc-300 leading-relaxed">
                      To access certain features of the Service, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Account Security</h3>
                    <p className="text-zinc-300 leading-relaxed">
                      You are responsible for safeguarding the password and for maintaining the confidentiality of your account. You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">4. User Conduct and Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    You agree not to use the Service to:
                  </p>
                  <ul className="list-disc list-inside text-zinc-300 space-y-2">
                    <li>Upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
                    <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
                    <li>Upload, post, or transmit any content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights</li>
                    <li>Upload, post, or transmit any unsolicited or unauthorized advertising, promotional materials, spam, or any other form of solicitation</li>
                    <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
                    <li>Attempt to gain unauthorized access to any portion of the Service or any other systems or networks</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">5. Intellectual Property Rights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Our Content</h3>
                    <p className="text-zinc-300 leading-relaxed">
                      The Service and its original content, features, and functionality are and will remain the exclusive property of Marvel Rivals HQ and its licensors. The Service is protected by copyright, trademark, and other laws.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">User Content</h3>
                    <p className="text-zinc-300 leading-relaxed">
                      By posting content to the Service, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in connection with operating and providing the Service.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Marvel Rivals</h3>
                    <p className="text-zinc-300 leading-relaxed">
                      Marvel Rivals is a trademark of NetEase Games. This website is not affiliated with, endorsed by, or sponsored by NetEase Games or Marvel Entertainment. All game content, characters, and assets are the property of their respective owners.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">6. Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed">
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection, use, and disclosure of your personal information.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">7. Disclaimers and Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Service Availability</h3>
                    <p className="text-zinc-300 leading-relaxed">
                      The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not warrant that the Service will be uninterrupted, timely, secure, or error-free. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Content Accuracy</h3>
                    <p className="text-zinc-300 leading-relaxed">
                      While we strive to provide accurate and up-to-date information about Marvel Rivals, we make no warranties about the completeness, reliability, or accuracy of this information. Game mechanics, statistics, and meta information may change frequently.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                    <p className="text-zinc-300 leading-relaxed">
                      In no event shall Marvel Rivals HQ be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">8. Termination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed">
                    We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">9. Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">10. Governing Law</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed">
                    These Terms shall be interpreted and governed by the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#18181B] border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-[#E10600]">11. Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="text-zinc-300 space-y-2">
                    <p><strong>Email:</strong> legal@marvelrivalz.com</p>
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