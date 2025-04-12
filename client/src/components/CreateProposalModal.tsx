import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';
import { createProposal } from '@/lib/web3';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';
import { Loader2 } from 'lucide-react';

interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProposalModal: React.FC<CreateProposalModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { account } = useWallet();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both a title and description for your proposal.",
        variant: "destructive",
      });
      return;
    }
    
    if (!account) {
      toast({
        title: "Wallet Disconnected",
        description: "Please connect your wallet to submit a proposal.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await createProposal(title, description, account);
      
      toast({
        title: "Proposal Created",
        description: "Your proposal has been successfully submitted to the DAO.",
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      
      // Invalidate proposals query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['/api/proposals'] });
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error creating proposal:", error);
      toast({
        title: "Proposal Creation Failed",
        description: "There was an error creating your proposal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#1e1e2f] border-[#4b3295] text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-space">Create Proposal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="proposal-title">Proposal Title</Label>
            <Input
              id="proposal-title"
              placeholder="Enter a concise, descriptive title"
              className="bg-[#2d2d44] border-[#3a3a55] focus:border-[#6b46c1] focus-visible:ring-[#6b46c1]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="proposal-description">Description</Label>
            <Textarea
              id="proposal-description"
              placeholder="Describe your proposal in detail. What is the goal? How will it benefit the DAO?"
              className="min-h-[150px] bg-[#2d2d44] border-[#3a3a55] focus:border-[#6b46c1] focus-visible:ring-[#6b46c1]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="bg-[#0c1137] p-4 rounded-lg">
            <h4 className="font-medium mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 text-gray-300 list-disc pl-4">
              <li>You must have at least 10,000 $SPACE tokens</li>
              <li>Proposals will be active for voting for 7 days</li>
              <li>A quorum of 30% of total supply is required for execution</li>
              <li>Proposals cannot be edited after submission</li>
            </ul>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="bg-[#2d2d44] hover:bg-[#3a3a55] border-none"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="cosmic" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : 'Submit Proposal'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProposalModal;
