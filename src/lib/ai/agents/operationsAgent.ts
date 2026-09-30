import { BottleneckReport } from '../../types';
import { store } from '../../db/store';

export function runBottleneckDetectionAgent(): BottleneckReport {
  const report = store.getBottleneckReport();

  store.addTrace({
    id: `tr-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    agentName: 'Operations Agent',
    action: 'Ran automated bottleneck detection analysis across active merchant dataset',
    toolExecuted: 'analyze_activation_funnel()',
    resultSummary: `Detected primary friction at "${report.detectedBottleneck}" affecting ${report.dropoffPercentage}% of onboardings.`,
    nextStep: 'Present suggested operational intervention on Operations Dashboard'
  });

  return report;
}
