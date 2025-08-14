import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { Upload, Calendar, Phone, Mail, User, X, Video, MapPin, Plus, Trash2 } from 'lucide-react';
import ReactPlayer from 'react-player';
import { supabase } from '../../lib/supabase';

interface MachineDetails {
  brand: string;
  model: string;
  condition: string;
  photos: string[];
  video: string | null;
  comments: string;
}

interface FormInput {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  machines: MachineDetails[];
  marketingConsent: boolean;
  newsletterOptIn: boolean;
}

const MAX_PHOTOS = 12;
const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [machines, setMachines] = useState<MachineDetails[]>([{
    brand: '',
    model: '',
    condition: '',
    photos: [],
    video: null,
    comments: ''
  }]);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInput>();

  const addMachine = () => {
    setMachines([...machines, {
      brand: '',
      model: '',
      condition: '',
      photos: [],
      video: null,
      comments: ''
    }]);
  };

  const removeMachine = (index: number) => {
    setMachines(machines.filter((_, i) => i !== index));
  };

  const handlePhotoChange = (machineIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > MAX_PHOTOS) {
      toast.error(`Maximum ${MAX_PHOTOS} photos allowed per machine`);
      return;
    }
    
    const invalidFiles = files.filter(
      file => !ALLOWED_PHOTO_TYPES.includes(file.type) || file.size > MAX_PHOTO_SIZE
    );
    
    if (invalidFiles.length > 0) {
      toast.error('Some photos were rejected', {
        description: 'Please ensure all files are images under 5MB'
      });
      return;
    }
    
    Promise.all(
      files.map(file => fileToBase64(file))
    ).then(photoBase64Array => {
      const updatedMachines = [...machines];
      updatedMachines[machineIndex].photos = photoBase64Array;
      setMachines(updatedMachines);
    });
  };

  const handleVideoChange = (machineIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      toast.error('Invalid video format', {
        description: 'Please upload an MP4, WebM, or QuickTime video'
      });
      return;
    }
    
    if (file.size > MAX_VIDEO_SIZE) {
      toast.error('Video file too large', {
        description: 'Maximum video size is 100MB'
      });
      return;
    }
    
    fileToBase64(file).then(videoBase64 => {
      const updatedMachines = [...machines];
      updatedMachines[machineIndex].video = videoBase64;
      setMachines(updatedMachines);
    });
  };

  const removePhoto = (machineIndex: number, photoIndex: number) => {
    const updatedMachines = [...machines];
    updatedMachines[machineIndex].photos = updatedMachines[machineIndex].photos.filter((_, i) => i !== photoIndex);
    setMachines(updatedMachines);
  };

  const removeVideo = (machineIndex: number) => {
    const updatedMachines = [...machines];
    updatedMachines[machineIndex].video = null;
    setMachines(updatedMachines);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsSubmitting(true);
    
    try {
      const submissionData = {
        contact_info: {
          name: data.name,
          email: data.email,
          phone: data.phone
        },
        machine_details: machines,
        preferred_date: data.preferredDate ? new Date(data.preferredDate).toISOString() : null,
        status: 'new'
      };
      
      const { error } = await supabase
        .from('submissions')
        .insert([submissionData]);
      
      if (error) throw error;
      
      toast.success('Your submission has been received!', {
        description: 'We will contact you shortly with offers for your machines.'
      });
      
      reset();
      setMachines([{
        brand: '',
        model: '',
        condition: '',
        photos: [],
        video: null,
        comments: ''
      }]);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was a problem with your submission', {
        description: 'Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="mb-4">Get Your <span className="text-primary-500">Cash Offer</span> Today</h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Fill out the form below with information about your pinball machines, and we'll contact you with competitive offers.
            </p>
            <div className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
              <MapPin size={16} />
              <span>Note: We currently service locations within 150 miles of Detroit, MI</span>
            </div>
          </motion.div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                </div>
                
                <div>
                  <label htmlFor="name" className="label">
                    <User size={16} className="inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`input ${errors.name ? 'border-error-500 focus:ring-error-500' : ''}`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="text-error-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="label">
                    <Mail size={16} className="inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`input ${errors.email ? 'border-error-500 focus:ring-error-500' : ''}`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-error-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="label">
                    <Phone size={16} className="inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`input ${errors.phone ? 'border-error-500 focus:ring-error-500' : ''}`}
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9\-\+\(\)\s]{10,15}$/,
                        message: 'Invalid phone number'
                      }
                    })}
                  />
                  {errors.phone && (
                    <p className="text-error-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="preferredDate" className="label">
                    <Calendar size={16} className="inline mr-2" />
                    Preferred Removal Date
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    className="input"
                    {...register('preferredDate')}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Machine Details */}
              {machines.map((machine, index) => (
                <div key={index} className="border rounded-lg p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Machine {index + 1}</h3>
                    {machines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMachine(index)}
                        className="text-error-500 hover:text-error-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor={`machines.${index}.brand`} className="label">Brand/Manufacturer *</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="e.g., Stern, Williams, Bally"
                        value={machine.brand}
                        onChange={(e) => {
                          const updatedMachines = [...machines];
                          updatedMachines[index].brand = e.target.value;
                          setMachines(updatedMachines);
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor={`machines.${index}.model`} className="label">Model/Name *</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="e.g., The Addams Family"
                        value={machine.model}
                        onChange={(e) => {
                          const updatedMachines = [...machines];
                          updatedMachines[index].model = e.target.value;
                          setMachines(updatedMachines);
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor={`machines.${index}.condition`} className="label">Condition *</label>
                      <select
                        className="input"
                        value={machine.condition}
                        onChange={(e) => {
                          const updatedMachines = [...machines];
                          updatedMachines[index].condition = e.target.value;
                          setMachines(updatedMachines);
                        }}
                        required
                      >
                        <option value="">Select condition...</option>
                        <option value="mint">Mint - Like new</option>
                        <option value="excellent">Excellent - Minor wear</option>
                        <option value="good">Good - Some wear, fully working</option>
                        <option value="fair">Fair - Significant wear, working</option>
                        <option value="poor">Poor - Major issues, partially working</option>
                        <option value="non-working">Not Working - For parts only</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={`machines.${index}.comments`} className="label">Additional Details</label>
                      <textarea
                        rows={4}
                        className="input"
                        placeholder="Please provide any additional details..."
                        value={machine.comments}
                        onChange={(e) => {
                          const updatedMachines = [...machines];
                          updatedMachines[index].comments = e.target.value;
                          setMachines(updatedMachines);
                        }}
                      ></textarea>
                    </div>

                    <div className="md:col-span-2">
                      <label className="label">
                        <Upload size={16} className="inline mr-2" />
                        Upload Photos (up to 12)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          id={`photos-${index}`}
                          onChange={(e) => handlePhotoChange(index, e)}
                        />
                        <label
                          htmlFor={`photos-${index}`}
                          className="cursor-pointer w-full h-12 flex items-center justify-center px-4 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          {machine.photos.length > 0 ? 'Add More Photos' : 'Select Photos'}
                        </label>
                      </div>

                      {machine.photos.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {machine.photos.map((photo, photoIndex) => (
                            <div key={photoIndex} className="relative group">
                              <img 
                                src={photo}
                                alt={`Preview ${photoIndex + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(index, photoIndex)}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="label">
                        <Video size={16} className="inline mr-2" />
                        Upload Gameplay Video (optional)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          id={`video-${index}`}
                          onChange={(e) => handleVideoChange(index, e)}
                        />
                        <label
                          htmlFor={`video-${index}`}
                          className="cursor-pointer w-full h-12 flex items-center justify-center px-4 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          {machine.video ? 'Change Video' : 'Select Video'}
                        </label>
                      </div>

                      {machine.video && (
                        <div className="mt-4 relative">
                          <ReactPlayer
                            url={machine.video}
                            controls
                            width="100%"
                            height="auto"
                            className="rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeVideo(index)}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={addMachine}
                  className="flex items-center gap-2 text-primary-500 hover:text-primary-600"
                >
                  <Plus size={20} />
                  Add Another Machine
                </button>
              </div>

              <div className="mt-8">
                <div className="space-y-4">
                  {/* Marketing Consent Checkbox */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketingConsent"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        {...register('marketingConsent')}
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="marketingConsent" className="text-sm text-gray-600">
                        I agree to allow Mecca Buys to use photos and videos of my pinball machine(s) for marketing purposes
                      </label>
                    </div>
                  </div>

                  {/* Newsletter Opt-in Checkbox */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="newsletterOptIn"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        {...register('newsletterOptIn')}
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="newsletterOptIn" className="text-sm text-gray-600">
                        Yes, I'd like to receive marketing emails about pinball machines for sale, special offers, and company updates
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg mt-4">
                  <p>
                    <strong>Important Notice:</strong> Final price will be confirmed upon inspection at time of pickup. 
                    A bill of sale and transfer documentation will be completed at the time of transaction.
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit & Get Cash Offers'
                  )}
                </button>
              </div>

              <div className="text-center text-sm text-gray-500">
                By submitting this form, you agree to our 
                <a href="/privacy-policy" className="text-primary-500 hover:underline"> Privacy Policy</a>.
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
