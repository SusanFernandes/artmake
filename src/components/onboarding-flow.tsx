"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CompanySetup } from "@/components/onboarding/company-setup"
import { AgentCreation } from "@/components/onboarding/agent-creation"
import { KnowledgeUpload } from "@/components/onboarding/knowledge-upload"
import { VoicePersonality } from "@/components/onboarding/voice-personality"
import { ChannelSetup } from "@/components/onboarding/channel-setup"
import { TestingSandbox } from "@/components/onboarding/testing-sandbox"
import { GoLive } from "@/components/onboarding/go-live"
import { Brain, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import { useToast } from '@/hooks/use-toast'
import { AnimatePresence, motion } from 'framer-motion'
import MotionWrapper, { containerVariants, itemVariants, MOTION } from '@/components/ui/MotionWrapper'

const STEPS = [
  { id: 1, title: "Company Profile", description: "Tell us about your business" },
  { id: 2, title: "Agent Creation", description: "Create your first AI agent" },
  { id: 3, title: "Knowledge Upload", description: "Upload your documents and FAQs" },
  { id: 4, title: "Voice & Personality", description: "Choose voice and tone" },
  { id: 5, title: "Channel Setup", description: "Configure communication channels" },
  { id: 6, title: "Testing", description: "Test your agent before going live" },
  { id: 7, title: "Go Live", description: "Deploy your agent" },
]

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [onboardingData, setOnboardingData] = useState({})
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  // hydrate from server-side onboarding progress if present
  useEffect(() => {
    ;(async () => {
      try {
        const prog = await apiClient.getOnboardingProgress()
        if (prog?.exists && prog.data) {
          setOnboardingData(prog.data)
        }
      } catch (e) {
        // ignore
      }
    })()
  }, [])
  const router = useRouter()

  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100

  const handleStepComplete = (stepData: any) => {
    // compute merged data and persist in state
    const merged = { ...onboardingData, ...stepData }
    setOnboardingData(merged)

    // Call backend based on step
    ;(async () => {
      setIsProcessing(true)
      try {
        let agentId = (merged as any).agent_id || ''

        // Step 1: company profile
        if (currentStep === 1 && stepData.company) {
          await apiClient.saveCompanyProfile({ company_name: stepData.company.companyName, industry: stepData.company.industry, use_case: stepData.company.useCase })
          try { await apiClient.saveOnboardingProgress({ current_step: currentStep, data: { company: stepData.company } }) } catch (e) {}
        }

        // Step 2: create agent
        if (currentStep === 2 && stepData.agent) {
          const res = await apiClient.createAgent({ name: stepData.agent.agentName, role: stepData.agent.role, channels: stepData.agent.channels })
          const createdAgentId = (res as any)?.agent_id
          if (createdAgentId) {
            agentId = createdAgentId
            const mergedWithAgent = { ...merged, agent_id: agentId }
            setOnboardingData(mergedWithAgent)
            toast({ title: 'Agent created', description: 'Your agent was created successfully.' })
            try { await apiClient.saveOnboardingProgress({ agent_id: agentId, current_step: currentStep, data: { agent: stepData.agent } }) } catch (e) {}
          }
        }

        // Step 3: knowledge upload
        if (currentStep === 3 && stepData.knowledge) {
          await apiClient.uploadKnowledge({ files: stepData.knowledge.files, websites: stepData.knowledge.websites, faqText: stepData.knowledge.faqText })
          try { await apiClient.saveOnboardingProgress({ current_step: currentStep, data: { knowledge: { websites: stepData.knowledge.websites } } }) } catch (e) {}
        }

        // Step 4: voice configuration
        if (currentStep === 4 && stepData.voice) {
          await apiClient.configureVoice({ voice: stepData.voice.voice, tone: stepData.voice.tone, language: stepData.voice.language })
          try { await apiClient.saveOnboardingProgress({ current_step: currentStep, data: { voice: stepData.voice } }) } catch (e) {}
        }

        // Step 5: channels
        if (currentStep === 5 && stepData.channels) {
          const channelPayload = {
            phone_number: stepData.phone_number || stepData.channels.phoneNumber || undefined,
            chat_widget: {
              enabled: stepData.channels.chatWidget?.enabled ?? true,
              website_url: stepData.channels.chatWidget?.websiteUrl || undefined,
              widget_color: stepData.channels.chatWidget?.widgetColor || undefined,
            },
            whatsapp: {
              enabled: stepData.channels.whatsapp?.enabled ?? false,
              business_number: stepData.channels.whatsapp?.businessNumber || undefined,
            },
            email: {
              enabled: stepData.channels.email?.enabled ?? false,
              forwarding_address: stepData.channels.email?.forwardingAddress || undefined,
            },
          }
          await apiClient.setupChannels(channelPayload as any)
          toast({ title: 'Channels configured', description: 'Communication channels saved.' })
          try { await apiClient.saveOnboardingProgress({ current_step: currentStep, data: { channels: channelPayload } }) } catch (e) {}
        }

        // Step 7: deploy
        if (currentStep === 7) {
          const effectiveAgentId = (merged as any).agent_id || agentId || ''
          try {
            const res = await apiClient.deployAgent(effectiveAgentId)
            toast({ title: 'Deployment started', description: 'Agent deployment is in progress.' })
            if (res?.phone_number) {
              const mergedWithPhone = { ...merged, phone_number: res.phone_number }
              setOnboardingData(mergedWithPhone)
            }
          } catch (err: any) {
            toast({ title: 'Deployment failed', description: err?.message || 'Failed to deploy agent' })
          }
          // Final step: clear server-side progress
          try { await apiClient.deleteOnboardingProgress() } catch (e) {}
        }
      } catch (e) {
        console.warn('Onboarding step API error', e)
        toast({ title: 'Error', description: (e as any)?.message || 'API error' })
      } finally {
        setIsProcessing(false)
      }
    })()

    // advance UI
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Onboarding complete, redirect to dashboard
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CompanySetup onComplete={handleStepComplete} />
      case 2:
        return <AgentCreation onComplete={handleStepComplete} />
      case 3:
        return <KnowledgeUpload onComplete={handleStepComplete} />
      case 4:
        return <VoicePersonality onComplete={handleStepComplete} />
      case 5:
        return <ChannelSetup onComplete={handleStepComplete} />
      case 6:
        return <TestingSandbox onComplete={handleStepComplete} />
      case 7:
        return <GoLive onComplete={handleStepComplete} phoneNumber={(onboardingData as any).phone_number} />
      default:
        return null
    }
  }

  return (
    <MotionWrapper className="min-h-screen bg-background">
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">VoiceFlow AI</span>
          </div>
          <Badge variant="secondary">Setup in Progress</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Agent Setup</h1>
              <p className="text-muted-foreground">
                Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1]?.title}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Progress</div>
              <div className="text-2xl font-bold">{Math.round(progress)}%</div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="sticky top-24">
                <CardTitle className="text-lg">Setup Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {STEPS.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                      step.id === currentStep
                        ? "bg-accent text-accent-foreground"
                        : completedSteps.includes(step.id)
                          ? "bg-muted text-muted-foreground"
                          : "text-muted-foreground"
                    }`}
                  >
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
                          step.id === currentStep ? "border-accent-foreground bg-accent-foreground text-accent" : ""
                        }`}
                      >
                        {step.id === currentStep ? step.id : step.id}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className="text-xs opacity-70">{step.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6 h-[calc(100vh-220px)] overflow-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1 || isProcessing}>
                Back
              </Button>
              <div className="text-sm text-muted-foreground">
                Need help?{" "}
                <a href="#" className="text-accent hover:underline">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </MotionWrapper>
  )
}
