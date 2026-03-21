import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "motion/react";
import React, { useRef, useState } from "react";
import { ChevronDown, ArrowRight, Heart, Wind, Droplets, Flame, Sparkles, Leaf, Star, Instagram, Mail, Check, Calendar, Users, Euro, Clock } from "lucide-react";

function ParallaxSection({ children, className, speed = 1 }: { children: React.ReactNode; className?: string; speed?: number }) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 20}%`]);

	return (
		<section ref={ref} className={`relative overflow-hidden ${className || ""}`}>
			<motion.div style={{ y }} className="h-full w-full">
				{children}
			</motion.div>
		</section>
	);
}

function ExpandableText({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon?: any }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border-b border-aman-medium/30 py-4">
			<button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between text-left focus:outline-none group">
				<div className="flex items-center gap-4">
					{Icon && <Icon className="w-6 h-6 text-aman-highlight group-hover:scale-110 transition-transform" />}
					<h3 className="text-xl md:text-2xl font-serif text-aman-dark">{title}</h3>
				</div>
				<ChevronDown className={`w-6 h-6 text-aman-medium transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
			</button>
			<motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden">
				<div className="pt-4 pb-2 text-aman-grey text-lg leading-relaxed">{children}</div>
			</motion.div>
		</div>
	);
}

function FloatingElement({ children, speed = 1, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], ["-50%", `${speed * 100}%`]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, speed * 45]);

	return (
		<motion.div ref={ref} style={{ y, rotate }} className={`absolute pointer-events-none ${className}`}>
			{children}
		</motion.div>
	);
}

export default function App() {
	const { scrollY, scrollYProgress } = useScroll();
	const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
	const [activePillar, setActivePillar] = useState<number | null>(null);
	const [scrolled, setScrolled] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		setScrolled(latest > 50);
	});

	const pillars = [
		{ title: "Presence", icon: Heart, quote: "To be here, fully, without the urge to escape." },
		{ title: "Self-love", icon: Heart, quote: "Not as a feeling, but as an unconditional practice of staying with yourself." },
		{ title: "Joy", icon: Heart, quote: "The natural resonance of a nervous system that feels safe." },
		{ title: "Authenticity", icon: Heart, quote: "Letting go of who you think you should be, to be who you are." },
	];

	return (
		<div className="min-h-screen bg-aman-offwhite font-sans selection:bg-aman-light selection:text-aman-dark">
			{/* Progress Bar */}
			<motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-aman-highlight origin-left z-50" style={{ scaleX }} />

			{/* Navigation */}
			<nav className={`fixed top-0 w-full p-6 flex justify-between items-center z-40 transition-all duration-500 ${scrolled ? "bg-aman-dark/80 backdrop-blur-md shadow-lg shadow-black/10" : ""} text-aman-offwhite`}>
				<img src="/AMAN HATI_LOGO_white.png" alt="Aman Hati" className="h-10 w-auto shrink-0" />
				<a href="https://tally.so/r/lbyyRV" target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 text-sm sm:text-base sm:px-6 sm:py-2 rounded-full bg-aman-light text-aman-dark hover:bg-aman-offwhite transition-colors duration-300">
					Apply Now
				</a>
			</nav>

			{/* Hero Section */}
			<section className="relative h-screen flex items-center justify-center overflow-hidden bg-aman-dark text-aman-offwhite">
				<motion.div className="absolute inset-0 opacity-20" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: "easeOut" }}>
					<img src="/pictures/1.webp" alt="Aman Hati Hero" className="w-full h-full object-cover" />
				</motion.div>

				<div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-40">
					<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6 flex justify-center">
						{/*<img src="/AMAN HATI_LOGO_white.png" alt="Aman Hati" className="h-32 md:h-48 lg:h-56 w-auto" />*/}
					</motion.div>
					<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="text-2xl md:text-3xl font-light text-light mb-8">
						A safe heart is not a heart without fear.
						<br />
						It is a heart that feels safe enough to stay open.
					</motion.p>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
						<p className="text-lg md:text-xl max-w-2xl mx-auto text-aman-offwhite/80 mb-12">A 6-Week journey into Authentic Self-Expression for sensitive beings ready to make their sensitivity their superpower.</p>
					</motion.div>

					<motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-0 left-1/2 -translate-x-1/2">
						<ChevronDown className="w-8 h-8 text-aman-light opacity-70" />
					</motion.div>
				</div>
			</section>

			{/* The Problem Section */}
			<ParallaxSection speed={-0.2} className="py-32 px-6 md:px-12 bg-aman-offwhite">
				<FloatingElement speed={0.5} className="top-10 left-[10%] text-aman-light/30">
					<Leaf className="w-24 h-24" />
				</FloatingElement>
				<FloatingElement speed={-0.3} className="bottom-20 right-[15%] text-aman-medium/20">
					<Sparkles className="w-32 h-32" />
				</FloatingElement>

				<div className="max-w-4xl mx-auto relative z-10">
					<motion.h2 initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-serif text-aman-dark mb-12">
						Does this feel familiar?
					</motion.h2>

					<div className="grid md:grid-cols-2 gap-12">
						<div className="space-y-6 text-xl text-aman-grey">
							<p>You care deeply. You notice everything. You create quietly. You carry intensity silently.</p>
							<p>And when attention turns toward you - in relationships, in rooms, in your work - your body reacts.</p>
							<p className="font-serif text-2xl text-aman-highlight italic">Too much. Not enough.</p>
						</div>
						<div className="space-y-6 text-xl text-aman-grey">
							<p>So you soften yourself. Or you overcompensate. Or you retreat.</p>
							<p>This isn't lack of confidence. It's a nervous system that never learned how to feel safe while being seen in a world that is loud and fast. Sensitivity isn't the problem. The lack of safety is. When there is no internal safety, sensitivity becomes overwhelm. When safety grows - sensitivity becomes a superpower.</p>
						</div>
					</div>
				</div>
			</ParallaxSection>

			{/* The Shift Section */}
			<section className="py-32 px-6 md:px-12 bg-aman-medium text-aman-offwhite relative overflow-hidden">
				<FloatingElement speed={0.8} className="top-20 right-[5%] text-aman-dark/10">
					<Wind className="w-48 h-48" />
				</FloatingElement>
				<FloatingElement speed={-0.6} className="bottom-10 left-[5%] text-aman-light/10">
					<Droplets className="w-40 h-40" />
				</FloatingElement>

				<div className="max-w-6xl mx-auto relative z-10">
					<div className="max-w-4xl mx-auto mb-16 text-center">
						<motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-serif text-aman-light mb-8">
							Nothing about sensitivity disappears.
							<br />
							What changes is the relationship to it.
						</motion.h2>
						<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-4 text-xl font-light leading-relaxed">
							<p>The nervous system steadies. The body softens under attention. Expression costs less energy.</p>
							<p>You stop shrinking. You stop pushing. You respond instead of react.</p>
							<p>And being seen - in your relationships, your creativity, your leadership - no longer feels like survival. It feels aligned.</p>
							<p className="font-serif text-2xl text-aman-light italic">So life feels less overwhelming - because there are anchors as we move:</p>
						</motion.div>
					</div>

					<div className="grid md:grid-cols-2 gap-16">
						<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-aman-dark/20 p-10 rounded-3xl backdrop-blur-sm">
							<h3 className="text-3xl font-serif mb-8 text-aman-light">From</h3>
							<ul className="space-y-4 text-lg">
								<li className="flex items-start gap-3">
									<span className="text-aman-offwhite/70 mt-1">✕</span> Overthinking before speaking
								</li>
								<li className="flex items-start gap-3">
									<span className="text-aman-offwhite/70 mt-1">✕</span> Holding back to avoid tension
								</li>
								<li className="flex items-start gap-3">
									<span className="text-aman-offwhite/70 mt-1">✕</span> Emotional overwhelm or sudden shutdown
								</li>
								<li className="flex items-start gap-3">
									<span className="text-aman-offwhite/70 mt-1">✕</span> Absorbing other people's moods
								</li>
								<li className="flex items-start gap-3">
									<span className="text-aman-offwhite/70 mt-1">✕</span> Second-guessing intuition
								</li>
							</ul>
						</motion.div>

						<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-aman-offwhite p-10 rounded-3xl text-aman-dark shadow-xl">
							<h3 className="text-3xl font-serif mb-8 text-aman-medium">To</h3>
							<ul className="space-y-4 text-lg">
								<li className="flex items-start gap-3">
									<span className="text-aman-medium mt-1">✓</span> Pausing before responding
								</li>
								<li className="flex items-start gap-3">
									<span className="text-aman-medium mt-1">✓</span> Speaking honestly without collapsing
								</li>
								<li className="flex items-start gap-3">
									<span className="text-aman-medium mt-1">✓</span> Feeling emotions without being flooded
								</li>
								<li className="flex items-start gap-3">
									<span className="text-aman-medium mt-1">✓</span> Recognizing what is yours - and what isn't
								</li>
								<li className="flex items-start gap-3">
									<span className="text-aman-medium mt-1">✓</span> Trusting sensitivity as information
								</li>
							</ul>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Image Before Pillars */}
			<section className="pt-16 pb-8 px-6 md:px-12 bg-aman-dark">
				<div className="max-w-6xl mx-auto">
					<div className="rounded-3xl overflow-hidden shadow-xl border border-aman-medium/20 h-[60vh] md:h-[70vh]">
						{/* REPLACE WITH UPLOADED IMAGE URL */}
						<img src="/pictures/2.webp" alt="Transition to Pillars" className="w-full h-full object-cover" />
					</div>
				</div>
			</section>

			{/* The Pillars */}
			<section className="pt-8 pb-16 px-6 md:px-12 bg-aman-dark text-aman-offwhite text-center">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl md:text-6xl font-serif text-aman-light mb-8">The Pillars</h2>
					<p className="text-2xl font-light italic text-aman-light mb-16">Not concepts to understand. Not traits to perform. They are states of being.</p>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
						{pillars.map((pillar, i) => (
							<motion.div key={pillar.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} onClick={() => setActivePillar(activePillar === i ? null : i)} className={`p-6 rounded-2xl border border-aman-medium/30 backdrop-blur-sm cursor-pointer transition-colors ${activePillar === i ? "bg-aman-medium/30" : "bg-aman-medium/10 hover:bg-aman-medium/20"}`}>
								<pillar.icon className="w-8 h-8 mx-auto mb-4 text-aman-highlight" />
								<h4 className="text-xl font-serif">{pillar.title}</h4>
							</motion.div>
						))}
					</div>

					<div className="min-h-[100px] mb-8">
						<AnimatePresence mode="wait">
							{activePillar !== null && (
								<motion.div key={activePillar} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-8 rounded-2xl bg-aman-medium/20 border border-aman-medium/30 text-xl italic text-aman-light/90 leading-relaxed">
									"{pillars[activePillar].quote}"
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</section>

			{/* The Framework Section */}
			<ParallaxSection speed={0.1} className="pt-16 pb-16 px-6 md:px-12 bg-aman-offwhite">
				<FloatingElement speed={0.4} className="top-1/4 right-[10%] text-aman-highlight/10">
					<Flame className="w-32 h-32" />
				</FloatingElement>
				<FloatingElement speed={-0.5} className="bottom-1/4 left-[5%] text-aman-medium/10">
					<Heart className="w-24 h-24" />
				</FloatingElement>

				<div className="max-w-4xl mx-auto relative z-10">
					<div className="text-center mb-20">
						<h2 className="text-4xl md:text-6xl font-serif text-aman-dark mb-6">The Framework</h2>
						<p className="text-xl text-aman-grey max-w-2xl mx-auto">This journey moves from regulation to embodied visibility - step by step. Each phase builds on the previous one and throughout the process, simple rituals become anchors that stabilize change in daily life. Because insights are not enough. To live by them is the key.</p>
					</div>

					<div className="space-y-2">
						<ExpandableText title="Earth – Safety & Regulation" icon={Leaf}>
							<p>When the system is on alert, everything feels heavier. Conversations feel charged. Attention feels exposing. Rest feels restless. So you brace - or push - or withdraw.</p>
							<p className="mt-4">At the beginning of AMAN HATI, we slow the system down. You learn to recognize activation. To regulate before reacting. To return to your body instead of leaving it. </p>
						</ExpandableText>

						<ExpandableText title="Water – Emotional Clarity" icon={Droplets}>
							<p>Intensity without clarity becomes overwhelm. You absorb what isn't yours. You question your reactions. You feel deeply - but struggle to name it.</p>
							<p className="mt-4">As safety increases, we bring clarity to what moves inside you. Emotions become information instead of chaos. You learn to stay with what arises - without drowning in it. And slowly, confusion turns into clarity and this turns into a deeper self-trust. </p>
						</ExpandableText>

						<ExpandableText title="Fire – Protective Patterns & Masks" icon={Flame}>
							<p>"Too much." "Not enough." The identities built around those fears run quietly in the background. They keep you safe. And they keep you small.</p>
							<p className="mt-4">In this phase, we turn toward those protective patterns. Not to shame them. But to loosen their grip. Performance softens. Choice returns.</p>
						</ExpandableText>

						<ExpandableText title="Air – Communication & Boundaries" icon={Wind}>
							<p>Without safety, expression collapses or overcompensates. You silence yourself. Or you push too hard. Or you leave conversations wishing you had spoken differently.</p>
							<p className="mt-4">As regulation stabilizes, expression becomes practice. You experiment with speaking from presence. Listening without losing yourself. Setting boundaries without armor. Your voice begins to feel like yours truly. </p>
						</ExpandableText>

						<ExpandableText title="Space – Integration" icon={Sparkles}>
							<p>Growth that isn't anchored dissolves. You expand - then contract. Show up - then disappear.</p>
							<p className="mt-4">Toward the closing phase, we anchor what has shifted. Through ritual and repetition, safety becomes familiar. Not a peak state. A baseline. From here, visibility stops feeling like exposure and starts to feel aligned. So finally you leave behindt the constant state of readiness and let yourself be seen without feeling threatened by it. But learn to love it! </p>
						</ExpandableText>
					</div>

					<div className="mt-16 p-10 rounded-3xl bg-aman-light/40 border border-aman-medium/20 text-center">
						<h3 className="text-3xl md:text-4xl font-display tracking-widest uppercase mb-4 text-aman-dark">AMAN HATI</h3>
						<p className="text-lg text-aman-grey italic mb-4">In Bahasa, Aman means safe. Hati means heart.</p>
						<p className="text-xl text-aman-dark leading-relaxed max-w-2xl mx-auto">A safe heart is not a heart without fear. It is a heart that feels safe enough to stay open, honest and present - even during change. This journey builds that safety.</p>
					</div>
				</div>
			</ParallaxSection>

			{/* The Journey Section */}
			<section className="pt-16 pb-32 px-6 md:px-12 bg-aman-offwhite text-aman-dark">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl md:text-6xl font-serif mb-16 text-center">The Journey</h2>

					<div className="grid md:grid-cols-2 gap-12 mb-20">
						<div className="space-y-12">
							<div className="bg-white p-10 rounded-3xl shadow-sm border border-aman-medium/10">
								<h3 className="text-2xl font-serif mb-6 flex items-center gap-3">
									<Clock className="text-aman-medium" /> Overview
								</h3>
								<ul className="space-y-4 text-lg text-aman-grey">
									<li className="flex items-start gap-3">
										<Check className="w-5 h-5 text-aman-highlight shrink-0 mt-1" /> 6 weeks of weekly live group sessions of 90 minutes each
									</li>
									<li className="flex items-start gap-3">
										<Check className="w-5 h-5 text-aman-highlight shrink-0 mt-1" /> 1 Personal Alignment Session of 60 minutes
									</li>
									<li className="flex items-start gap-3">
										<Check className="w-5 h-5 text-aman-highlight shrink-0 mt-1" /> Live group call recordings, workbook, guided practices, curated resources and a gift or two
									</li>
									<li className="flex items-start gap-3">
										<Check className="w-5 h-5 text-aman-highlight shrink-0 mt-1" /> And after? Options for integration, continuation and to stay connected for support & accountability
									</li>
								</ul>
							</div>
						</div>

						<div className="space-y-12">
							<div className="bg-white p-8 rounded-3xl shadow-sm border border-aman-medium/10">
								<h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
									<Users className="text-aman-medium" /> Group Size
								</h3>
								<p className="text-lg text-aman-grey mb-2">Limited to 12 participants - for all genders that live on this planet!</p>
								<p className="text-lg text-aman-grey">Small enough for intimacy and large enough for collective depth.</p>
							</div>

							<div className="bg-white p-8 rounded-3xl shadow-sm border border-aman-medium/10">
								<h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
									<Calendar className="text-aman-medium" /> Start Date & Time
								</h3>
								<p className="text-lg text-aman-grey">
									Wednesday 29th of April
									<br />
									6.30 - 8 pm CET
								</p>
							</div>
						</div>
					</div>

					<div className="bg-aman-medium text-aman-offwhite p-10 md:p-16 rounded-3xl text-center max-w-4xl mx-auto relative overflow-hidden">
						<FloatingElement speed={0.3} className="top-0 right-0 text-aman-dark/10">
							<Sparkles className="w-48 h-48" />
						</FloatingElement>
						<h3 className="text-3xl font-serif mb-6 relative z-10">Investment</h3>
						<div className="relative z-10 space-y-6 text-lg">
							<p>
								The full investment for AMAN HATI - well, in yourself - is <span className="line-through opacity-70">1,260€</span>.
							</p>
							<div className="py-8 my-8 border-y border-aman-light/30">
								<p className="mb-4">As this is the initiation, the first group of 12 participants are invited at a special price of:</p>
								<p className="text-5xl md:text-7xl font-serif text-aman-light">630€</p>
							</div>
							<p>This honours your courage in stepping into the very first round and co-creating this space at the very beginning!</p>
							<p className="italic">Payment plan of 3x payments is available on request.</p>
							<p className="text-sm text-aman-light/80 mt-8">*If it's financially really tight, please apply anyway and share your situation.</p>
						</div>
					</div>
				</div>
			</section>

			{/* How to Join */}
			<section className="py-24 px-6 md:px-12 bg-aman-light text-aman-dark">
				<div className="max-w-5xl mx-auto text-center">
					<h2 className="text-4xl md:text-5xl font-serif mb-16">How to join</h2>
					<div className="grid md:grid-cols-3 gap-8 mb-16 text-left">
						<div className="bg-aman-offwhite p-8 rounded-3xl">
							<div className="text-4xl font-serif text-aman-highlight mb-4">1</div>
							<h3 className="text-2xl font-serif mb-4">Apply</h3>
							<p className="text-aman-grey">Fill out a short application so I can understand where you are and what is calling you.</p>
						</div>
						<div className="bg-aman-offwhite p-8 rounded-3xl">
							<div className="text-4xl font-serif text-aman-highlight mb-4">2</div>
							<h3 className="text-2xl font-serif mb-4">Alignment Call</h3>
							<p className="text-aman-grey">We'll have a short 20-minute call to make sure this journey is right for you.</p>
						</div>
						<div className="bg-aman-offwhite p-8 rounded-3xl">
							<div className="text-4xl font-serif text-aman-highlight mb-4">3</div>
							<h3 className="text-2xl font-serif mb-4">Confirmation</h3>
							<p className="text-aman-grey">You receive the final invitation and secure your spot through payment.</p>
						</div>
					</div>

					<a href="https://tally.so/r/lbyyRV" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-aman-highlight text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors duration-300">
						Apply Now <ArrowRight className="w-5 h-5" />
					</a>
				</div>
			</section>

			{/* Private Companionship */}
			<section className="py-32 px-6 md:px-12 bg-aman-dark text-aman-offwhite">
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-12 gap-12 md:gap-16">
						<div className="md:col-span-5">
							<div className="sticky top-32 rounded-3xl overflow-hidden shadow-xl border border-aman-medium/20">
								<img src="/pictures/3.webp" alt="Private Companionship" className="w-full h-auto object-cover" />
							</div>
						</div>

						<div className="md:col-span-7">
							<h2 className="text-4xl md:text-6xl font-serif mb-8 text-aman-light">Private companionship</h2>
							<div className="space-y-8 text-xl font-light leading-relaxed">
								<p>The foundation remains AMAN HATI: inner safety, emotional clarity, self-trust and authentic expression. But in 1:1 work, we go further.</p>
								<p>These spaces are especially supportive for sensitive leaders, creatives and visionaries who feel stuck - creatively, professionally or personally. Who are navigating transitional phases or simply want to work in a private setting to decisively move into their next chapter.</p>

								<div className="py-8">
									<h3 className="text-2xl font-serif mb-6 text-aman-light">Together, we work on:</h3>
									<ul className="space-y-3">
										<li className="flex items-center gap-3">
											<Check className="text-aman-highlight w-5 h-5" /> Regulating the inner noise that blocks expression
										</li>
										<li className="flex items-center gap-3">
											<Check className="text-aman-highlight w-5 h-5" /> Clarifying what wants to be created
										</li>
										<li className="flex items-center gap-3">
											<Check className="text-aman-highlight w-5 h-5" /> Identifying and dissolving self-sabotaging patterns
										</li>
										<li className="flex items-center gap-3">
											<Check className="text-aman-highlight w-5 h-5" /> Defining concrete next steps
										</li>
										<li className="flex items-center gap-3">
											<Check className="text-aman-highlight w-5 h-5" /> Building the courage to be seen
										</li>
									</ul>
								</div>

								<p className="text-2xl font-serif text-aman-light">This is not only inner work. It is creative motion.</p>
								<p>A container to birth what is ready to come through you - and to support you in sharing it with the world.</p>

								<div className="mt-12 p-8 border border-aman-medium/30 rounded-3xl bg-aman-medium/10">
									<h3 className="text-2xl font-serif mb-6 text-aman-light">Available as:</h3>
									<ul className="space-y-4">
										<li className="flex items-center gap-3">
											<ArrowRight className="text-aman-highlight w-5 h-5" /> Individual 90min deep-dive sessions
										</li>
										<li className="flex items-center gap-3">
											<ArrowRight className="text-aman-highlight w-5 h-5" /> 4 - session intensive immersion
										</li>
										<li className="flex items-center gap-3">
											<ArrowRight className="text-aman-highlight w-5 h-5" /> Tailor-made companionship journeys of 3 - 6 months
										</li>
									</ul>
								</div>

								<p className="mt-8 italic">If this feels aligned, reach out to explore what would serve you best.</p>

								<div className="mt-12">
									<a href="mailto:hello@amanhati.space" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-aman-highlight text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors duration-300">
										Send Inquiry
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<ParallaxSection speed={-0.2} className="py-32 px-6 md:px-12 bg-aman-light text-aman-dark">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl md:text-5xl font-serif text-center mb-16">Some client love</h2>
					<div className="grid md:grid-cols-2 gap-12">
						<div className="bg-aman-offwhite p-10 rounded-3xl shadow-lg relative">
							<Star className="absolute top-6 right-6 w-6 h-6 text-aman-highlight opacity-50" />
							<p className="text-lg italic mb-6 leading-relaxed">"Working with Nadja unlocked creative blockages I had carried for years – in just a few hours. She helped me see what I couldn't see myself and gave me a fresh, embodied vision for moving forward."</p>
							<p className="font-bold">— Rita R.</p>
						</div>
						<div className="bg-aman-offwhite p-10 rounded-3xl shadow-lg relative">
							<Star className="absolute top-6 right-6 w-6 h-6 text-aman-highlight opacity-50" />
							<p className="text-lg italic mb-6 leading-relaxed">"The journey with Nadja helped me shift from struggling with the outside world to reconnecting with my inner self. She listens deeply and quickly recognizes the true root of an issue."</p>
							<p className="font-bold">— Julia K.</p>
						</div>
						<div className="bg-aman-offwhite p-10 rounded-3xl shadow-lg relative md:col-span-2 max-w-3xl mx-auto">
							<Star className="absolute top-6 right-6 w-6 h-6 text-aman-highlight opacity-50" />
							<p className="text-lg italic mb-6 leading-relaxed">"I found Nadja at a time of professional burnout and deep uncertainty about my path. Her holistic and authentic approach provided grounded yet powerful guidance. She helped me align my strengths, experience, and passion with clarity and intention. Our work together reshaped my career direction and restored my confidence in myself and my vision."</p>
							<p className="font-bold">— Anne T.</p>
						</div>
					</div>
				</div>
			</ParallaxSection>

			{/* Hi, I'm Nadja */}
			<section className="py-32 px-6 md:px-12 bg-aman-offwhite text-aman-dark">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-5xl md:text-7xl font-serif mb-16 text-center">Hi, I'm Nadja</h2>

					<div className="grid md:grid-cols-12 gap-16">
						<div className="md:col-span-5">
							<div className="sticky top-32 rounded-3xl overflow-hidden shadow-xl">
								{/* REPLACE WITH UPLOADED IMAGE URL */}
								<img src="/pictures/4.webp" alt="Nadja" className="w-full h-auto object-cover" />
							</div>
						</div>

						<div className="md:col-span-7 space-y-16">
							<div>
								<h3 className="text-3xl font-serif mb-6 text-aman-medium">About Nadja</h3>
								<div className="space-y-4 text-xl text-aman-grey leading-relaxed">
									<p>My name means Hope - the color of the heart. It also means river. Channel. The one who calls.</p>
									<p>I work with sensitive, intuitive and creative people - because I am one.</p>
									<p>I know what it means to feel deeply in a world that moves fast. To sense everything in a room. To question whether you are too much - or not enough.</p>
									<p>I hold spaces where truth surfaces without pressure. Where intensity is felt, not fixed. Because expression becomes possible when the body feels safe.</p>
								</div>
							</div>

							<div>
								<h3 className="text-3xl font-serif mb-6 text-aman-medium">The Path I Walk</h3>
								<div className="space-y-4 text-xl text-aman-grey leading-relaxed">
									<p>My work isn't built on theory. It's built on thresholds.</p>
									<p>For years, I dimmed my light - appearing capable outside while doubting myself inside.</p>
									<p>I know the cost of shrinking. The exhaustion of overcompensating. The tension of wanting to be seen - and fearing it at the same time.</p>
									<p>I didn't bypass crisis or loss. I learned to stay.</p>
									<p>That's where inner safety was born. Not as confidence - as steadiness.</p>
								</div>
							</div>

							<div>
								<h3 className="text-3xl font-display mb-6 text-aman-medium">The Practice Behind AMAN HATI</h3>
								<div className="space-y-4 text-xl text-aman-grey leading-relaxed">
									<p>AMAN HATI is not about performance. It is about regulation.</p>
									<p>Drawing from 36 years of life, over a decade of devoted inner work, and international facilitation - from coaching to mindful leadership spaces to intimate retreats - I bridge lived experience with studied wisdom. With a background in the corporate world I understnad both sides and know how it feels to pivot. </p>
									<p className="font-serif text-2xl mt-8 mb-4">My approach integrates:</p>
									<ul className="space-y-2">
										<li>
											• <span className="font-medium">Ancient teachings</span> - to remember what we've forgotten.
										</li>
										<li>
											• <span className="font-medium">Somatic practice</span> - to ground insight in the body.
										</li>
										<li>
											• <span className="font-medium">Honest self-inquiry</span> - to loosen identities built around who we think we should be and discovering the core wounds to finally start to break free.{" "}
										</li>
									</ul>
									<p className="mt-8">This work is simple, but not easy.</p>
									<p className="font-serif text-2xl text-aman-highlight italic">We regulate. We feel. We integrate.</p>
									<p>And from there, expression changes naturally.</p>
								</div>
							</div>

							<div>
								<h3 className="text-3xl font-serif mb-6 text-aman-medium">Life as Ceremony</h3>
								<div className="space-y-4 text-xl text-aman-grey leading-relaxed">
									<p>I don't believe we inspire by being perfect. We inspire by walking authentically and in full acceptance and love for ourselves.</p>
									<p>To become "fully yourself" is, paradoxically, becoming nobody - letting go of the masks until what remains feels true.</p>
									<p>Hope to me is not wishful thinking. Hope is what allows us to open – to life, to beauty, and to the possibility that we are still loved when we dare to be fully ourselves.</p>
								</div>
							</div>
						</div>
					</div>
			</div>
			</section>

			{/* Is for you if Section */}
			<section className="py-32 px-6 md:px-12 bg-aman-dark text-aman-offwhite">
				<div className="max-w-4xl mx-auto">
					<motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-display text-aman-light mb-12">
						AMAN HATI is for You if
					</motion.h2>

					<div className="space-y-8 text-xl font-light leading-relaxed">
						<p>
							You're sensitive - and tired of managing yourself just to fit in.
							<br />
							You feel deeply. Think deeply. Create deeply.
						</p>
						<p>
							And you know there is more in you.
							<br />
							<span className="font-bold">More voice. More presence. More truth.</span>
						</p>
						<p>
							But when it's time to take up space, your body tightens.
							<br />
							<span className="italic">Too much. Not enough.</span>
						</p>
						<p>
							And that hesitation costs you:
							<br />
							Clarity. Momentum. Aligned relationships. Opportunities to be seen for who you are.
						</p>

						<div className="mt-12 p-8 border border-aman-medium/30 rounded-3xl bg-aman-medium/10">
							<h3 className="text-2xl font-display mb-6 text-aman-light">AMAN HATI is for those ready to move from:</h3>
							<ul className="space-y-4">
								<li className="flex items-center gap-3">Overwhelm → Regulation</li>
								<li className="flex items-center gap-3">Self-doubt → Self-trust</li>
								<li className="flex items-center gap-3">Reactivity → Response</li>
								<li className="flex items-center gap-3">Hiding → Expression</li>
								<li className="flex items-center gap-3">Survival → Sustainable visibility</li>
							</ul>
						</div>

						<p className="mt-8">Not by forcing confidence. But by building inner safety.</p>
						<p>During our time together, you learn to regulate before reacting, to feel without flooding, to speak without self-abandonment, and to create from steadiness instead of urgency.</p>
						<p className="text-2xl font-serif text-aman-light mt-8">And when safety becomes your baseline, being seen no longer feels like exposure. It feels aligned.</p>
						<p className="italic">If something in you feels recognized while reading this - that's your sign.</p>

						<p className="text-sm text-aman-light/60 mt-12 pt-8 border-t border-aman-medium/30">*This is not for you if you're looking for quick fixes or someone to tell you what decisions to make. This is about building the inner safety to decide for yourself.</p>
					</div>
				</div>
			</section>

			{/* Image Before Ready to Join */}
			<section className="pt-16 pb-8 px-6 md:px-12 bg-aman-offwhite">
				<div className="max-w-6xl mx-auto">
					<div className="rounded-3xl overflow-hidden shadow-xl border border-aman-medium/20 h-[60vh] md:h-[70vh]">
						{/* REPLACE WITH UPLOADED IMAGE URL */}
						<img src="/pictures/5.webp" alt="Transition to Ready to Join" className="w-full h-full object-cover" />
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section id="apply" className="pt-8 pb-32 px-6 md:px-12 bg-aman-offwhite text-center">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-5xl md:text-7xl font-serif text-aman-dark mb-8">Ready to join?</h2>
					<p className="text-xl text-aman-grey mb-12">The only reason why we continue to chase happiness in the future is because we believe that we can't have it now.</p>

					<div className="flex justify-center">
						<a href="https://tally.so/r/lbyyRV" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-aman-highlight text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors duration-300">
							Apply Now <ArrowRight className="w-5 h-5" />
						</a>
					</div>
				</div>
			</section>

			{/* Mailing List */}
			<section className="py-24 px-6 md:px-12 bg-aman-medium text-aman-offwhite text-center">
				<div className="max-w-2xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-serif mb-6">Stay Connected</h2>
					<p className="text-lg mb-8 text-aman-offwhite/80">Join the mailing list for updates, insights, and future offerings.</p>
					<div className="mx-auto w-full max-w-md">
						<form
							id="notify-form"
							className="space-y-4"
							onSubmit={(e) => {
								e.preventDefault();
								const form = e.currentTarget;
								const emailInput = form.querySelector("#email-input") as HTMLInputElement | null;
								const messageEl = document.getElementById("form-message");
								const email = emailInput?.value.trim() || "";

								const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
								if (!email || !emailRegex.test(email)) {
									if (messageEl) {
										messageEl.textContent = "Please enter a valid email address";
										messageEl.className = "text-center text-sm mt-3 transition-all text-rose-400";
									}
									return;
								}

								if (messageEl) {
									messageEl.textContent = "Submitting...";
									messageEl.className = "text-center text-sm mt-3 transition-all text-aman-offwhite/70";
								}

								try {
									const googleFormId = "1FAIpQLSe9tZC6EXL0VmMy79pbIGDQwpofOfp0Uo_gAL12Ld7hQUXg8Q";
									const emailEntryId = "entry.1420016806";
									const googleFormUrl = `https://docs.google.com/forms/d/e/${googleFormId}/formResponse?${emailEntryId}=${encodeURIComponent(email)}&submit=Submit`;

									const iframe = document.createElement("iframe");
									iframe.style.display = "none";
									document.body.appendChild(iframe);

									let formSubmitted = false;

									iframe.onload = () => {
										if (formSubmitted && messageEl) {
											messageEl.textContent = "We'll be in touch when the time comes - until then, keep your heart safe.";
											messageEl.className = "text-center text-sm mt-3 transition-all";
											form.reset();
										}
									};

									iframe.src = googleFormUrl;
									formSubmitted = true;

									setTimeout(() => {
										if (messageEl && messageEl.textContent === "Submitting...") {
											messageEl.textContent = "We'll be in touch when the time comes - until then, keep your heart safe.";
											messageEl.className = "text-center text-sm mt-3 transition-all";
											form.reset();
										}
										try {
											document.body.removeChild(iframe);
										} catch (_) { }
									}, 3000);
								} catch (error) {
									if (messageEl) {
										messageEl.textContent = "Something went wrong. Please try again.";
										messageEl.className = "text-center text-sm mt-3 transition-all text-rose-400";
									}
									console.error("Form submission error:", error);
								}
							}}>
							<div className="flex flex-col gap-2 sm:flex-row">
								<input type="email" name="email" id="email-input" placeholder="enter your email" required className="flex-1 rounded-full border border-aman-offwhite/20 bg-aman-offwhite/10 text-aman-offwhite px-4 py-2 duration-300 focus:border-transparent focus:ring-1 focus:ring-aman-highlight focus:outline-none placeholder:text-aman-offwhite/50" />
								<button type="submit" className="rounded-full px-10 py-2 w-auto self-center bg-aman-offwhite/10 hover:bg-aman-offwhite/20 border border-aman-offwhite/20 text-aman-offwhite/80 hover:text-aman-offwhite hover:border-aman-offwhite backdrop-blur-md duration-300 cursor-pointer">
									Subscribe
								</button>
							</div>
							<div id="form-message" className="text-center text-sm"></div>
						</form>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-12 px-6 bg-aman-dark text-aman-light/60">
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
					<img src="/AMAN HATI_LOGO_white.png" alt="Aman Hati" className="h-10 w-auto" />
					<div className="flex gap-6">
						<a href="https://instagram.com/amanhati.space" target="_blank" rel="noopener noreferrer" className="hover:text-aman-highlight transition-colors">
							<Instagram className="w-6 h-6" />
						</a>
						<a href="mailto:hello@amanhati.space" className="hover:text-aman-highlight transition-colors">
							<Mail className="w-6 h-6" />
						</a>
					</div>
					<p className="text-xs">© {new Date().getFullYear()} AMAN HATI SPACE. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
